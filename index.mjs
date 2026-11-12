export const handler = async (event) => {
  console.log("Received:", JSON.stringify(event));

  // Plain-string test input (e.g. "test") -> echo back uppercase, like the starter function.
  if (typeof event === "string") return event.toUpperCase();

  const issueUrl = event?.issue?.html_url;
  if (!issueUrl) return "ignored: no issue in payload"; // e.g. GitHub's "ping" event

  const slackUrl = process.env.SLACK_URL;
  if (!slackUrl) return "error: SLACK_URL not set";

  const res = await fetch(slackUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "Issue Created: " + issueUrl }),
  });
  return await res.text();
};