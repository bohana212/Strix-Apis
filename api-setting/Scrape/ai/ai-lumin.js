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
