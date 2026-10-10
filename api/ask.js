const { answer } = require("../lib/assistant");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (!question || question.length > 500) {
    res.status(400).json({ error: "Please ask a concise question about Godwin." });
    return;
  }

  try {
    res.status(200).json({ answer: await answer(question) });
  } catch (error) {
    console.error(error);
    res.status(503).json({ error: error.message || "Assistant unavailable" });
  }
};
