import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Gunakan metode POST" });
  }

  const { text } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key belum diatur di Vercel" });
  }

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
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.status(200).json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
}
