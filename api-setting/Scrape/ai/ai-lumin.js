const axios = require("axios");

async function nadyaaChat(teks) {
  const apiKey = "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"; // ganti ini ya!

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
          { role: "user", content: teks },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("💬 Nadyaa:", response.data.choices[0].message.content);
  } catch (err) {
    if (err.response) {
      console.error("❌ Error:", err.response.status, err.response.data);
    } else {
      console.error("❌ Error:", err.message);
    }
  }
}

// contoh panggilan
nadyaaChat("Halo Nadyaa, apa kabar?");
