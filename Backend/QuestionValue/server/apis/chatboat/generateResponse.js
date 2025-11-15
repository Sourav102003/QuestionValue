const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "YOUR_API_KEY",
});

const askGemini = async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: "Prompt is required!"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response returned";

    res.send({
      status: 200,
      success: true,
      message: "Response generated successfully!",
      reply
    });

  } catch (err) {
    console.log("Gemini API Error:", err);
    res.status(500).send({
      status: 500,
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
};

module.exports = { askGemini };
