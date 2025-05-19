// Netlify serverless function to proxy OpenRouter API requests securely
// Place this file in netlify/functions/openrouter-chat.js

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OpenRouter API key not set" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to connect to OpenRouter API" });
  }
};
