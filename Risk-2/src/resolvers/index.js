import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';


const resolver = new Resolver();

resolver.define('runRiskAnalysis', async (req) => {
  const issueKey = req.context.extension.issue.key;

  // Step 1: Fetch summary and description
  const issueRes = await api.asApp().requestJira(
    route`/rest/api/3/issue/${issueKey}?fields=summary,description,customfield_10086`
  );
  const issueData = await issueRes.json();

  const summary = issueData.fields.summary;
  const description = extractPlainText(issueData.fields.description);
  const risk = extractPlainText(issueData.fields.customfield_10086);


  // Step 2: Send to mock API
  // const apiResponse = await fetch('https://httpbin.org/post', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ summary, description }),
  // });

  // const apiResponse = await fetch('https://5366-213-52-61-2.ngrok-free.app', {
  //   method: 'GET',
  //   headers: { 'Accept': 'application/json' }
  //   // body: JSON.stringify({ summary, description }),
  // });

  // // Check for valid JSON response
  // if (!apiResponse.ok) {
  //   const errorText = await apiResponse.text();  // Safely read the response as text
  //   throw new Error(`API call failed: ${apiResponse.status} - ${errorText}`);
  // }


  // const apiData = await apiResponse.json();
  // const catfact = apiData.fact;

  // console.log(catfact);


  // STEP 2 REDO

  const apiResponse = await fetch('https://5366-213-52-61-2.ngrok-free.app/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ summary, description })
  });

  if (!apiResponse.ok) {
    const errorText = await apiResponse.text();
    throw new Error(`API call failed: ${apiResponse.status} - ${errorText}`);
  }

  const apiData = await apiResponse.json();
  const aIriskText = apiData.risk;
  console.log(aIriskText);



  // Step 3: Simulate getting "riskText" from response
  const riskText = `📄 Summary: ${summary}\n📝 Description: ${description}`;
  //console.log(riskText);
  const bodyData = {
    fields: {
      customfield_10086: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                //text: riskText
                //text: catfact
                text: aIriskText
              }
            ]
          }
        ]
      }
    }
  };




  // Step 4: Update the custom field
  await api.asApp().requestJira(
    route`/rest/api/3/issue/${issueKey}`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   fields: {
      //     summary: riskText,
      //   },
      // }),
      body: JSON.stringify(bodyData)


    }
  );

  return { status: 'success' };
});

// Helper to flatten Forge's document format
function extractPlainText(desc) {
  if (!desc?.content) return '';
  return desc.content
    .flatMap((c) => c.content || [])
    .map((d) => d.text || '')
    .join(' ')
    .trim();
}

export const handler = resolver.getDefinitions();
