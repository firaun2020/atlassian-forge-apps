import api, { route } from "@forge/api";

export async function run(event, context) {
	console.log("Hello World!!!!!!!!!");
	console.log(event);

	const issueKey = event.issue.key; // always use the issue key for API routes

	const bodyData = {
		body: "Test comment from Forge app"
	};

	try {
		const response = await api.asApp().requestJira(
			route`/rest/api/2/issue/${issueKey}/comment`,
			{
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData) // 🧠 must be a JSON string
			}
		);

		const result = await response.json();

		console.log(`Response: ${response.status} ${response.statusText}`);
		console.log("Jira API result:", result);

	} catch (error) {
		console.error("❌ Error occurred:", error);
	}
}
