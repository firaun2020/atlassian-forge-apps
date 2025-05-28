import React, { useState } from 'react';
import ForgeReconciler, {
  Text,
  Button,
  Stack,
  Heading,
  SectionMessage
} from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setStatus(null);
    setResult(null);

    try {
      const response = await invoke('runRiskAnalysis');
      if (response.status === 'success') {
        setResult(response.risk);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack vertical spacing="large" space='space.200'>
      <Heading size="medium">Automated Risk Analysis</Heading>
      <Text>
        Click the button below to generate a risk analysis for this issue using AI. The result will
        be written to the "Risk Analysis" field.
      </Text>

      <Stack alignInline='start' space='space.200'>
        <Button
          appearance="primary"
          onClick={handleClick}
          isLoading={loading}
        >
          AI Risk Analysis
        </Button>
      </Stack>


      {status === 'success' && result && (
        <SectionMessage title="Risk Analysis Result" appearance="info">
          <Text>{result}</Text>
        </SectionMessage>
      )}

      {status === 'error' && (
        <SectionMessage title="Something went wrong" appearance="error">
          <Text>Unable to generate risk analysis. Please try again.</Text>
        </SectionMessage>
      )}
    </Stack>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// import React, { useState } from 'react';
// import ForgeReconciler, { Button, Text, Spinner, Stack } from '@forge/react';
// import { invoke } from '@forge/bridge';

// const App = () => {
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(null);

//   const handleClick = async () => {
//     setLoading(true);
//     setStatus(null);

//     try {
//       const result = await invoke('runRiskAnalysis');
//       setStatus(result.status === 'success' ? 'Risk field updated ✅' : 'Update failed ❌');
//     } catch (err) {
//       console.error(err);
//       setStatus('Error occurred ❌');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Stack vertical spacing="medium">
//       <Button text="Run Risk Analysis" onClick={handleClick} isLoading={loading} />
//       {status && <Text>{status}</Text>}
//     </Stack>
//   );
// };

// ForgeReconciler.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
