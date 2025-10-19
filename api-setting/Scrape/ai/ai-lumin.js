import axios from "axios";

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const text = req.method === "GET" ? req.query.text : req.body?.text;

  console.log("Text:", text);
  console.log("API key ada?", !!apiKey);

  if (!apiKey) return res.status(500).json({ error: "API key belum diatur" });
  if (!text) return res.status(400).json({ error: "Parameter text kosong" });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // coba pakai ini dulu biar stabil
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah Nadyaa Sucilawati, gadis lembut, baik hati, sopan, dan berbicara penuh kasih sayang dalam Bahasa Indonesia.",
          },
          { role: "user", content: text },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error detail:", error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
}
