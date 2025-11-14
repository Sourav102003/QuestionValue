// const dotenv = require("dotenv");
// dotenv.config();

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // ✅ Initialize Gemini API client with key from .env
// const genAI = new GoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const generateResponse = async (req, res) => {
//   try {
//     const prompt = req.body.prompt || "Hello from Gemini API!";

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);

//     const responseText = result.response.text();

//     console.log("Gemini Response:", responseText);

//     res.status(200).send({
//       status: 200,
//       success: true,
//       message: "AI response generated successfully",
//       data: responseText,
//     });
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     res.status(500).send({
//       status: 500,
//       success: false,
//       message: "Error generating AI response",
//       error: error.message,
//     });
//   }
// };

// // ✅ Export function for routes
// module.exports = { generateResponse };
