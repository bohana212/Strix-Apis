// File: api/ai/ai-lumin.js
export default async function handler(req, res) {
  try {
    const text =
      req.method === "POST"
        ? req.body?.text
        : req.query?.text;

    if (!text) {
      return res.status(400).json({ error: "Parameter 'text' diperlukan." });
    }

    // Coba test dulu tanpa OpenAI (pastikan route aktif)
    // Kalau ini muncul, artinya route udah OK
    return res.status(200).json({
      message: "Endpoint aktif ✅",
      input: text,
      hint: "Sekarang kamu bisa hubungkan ke OpenAI API di sini.",
    });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
