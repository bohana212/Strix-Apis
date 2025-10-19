import axios from "axios";

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const text = req.method === "GET" ? req.query.text : req.body.text;

  if (!apiKey) return res.status(500).json({ error: "API key belum diatur" });
  if (!text) return res.status(400).json({ error: "Parameter text wajib diisi" });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
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

    res.status(200).json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
}
