import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Initialize the Gemini model outside the request lifecycle to reuse the instance
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", // Note: gemini-2.5-flash is currently the standard stable flash version
  temperature: 0.7,
  apiKey: process.env.GOOGLE_AI_API_KEY,
  maxOutputTokens: 500,
});

/**
 * Helper function to interact with the Gemini Model
 * @param {string} question 
 * @returns {Promise<string>}
 */
async function getAiResponse(question) {
  // Directly calling the model using LangChain's invoke pattern
  const response = await model.invoke(question);
  return response.content;
}

/**
 * Express Controller handling the inbound API request
 */
export async function chatWithAi(req, res) {
    const {question}= req.body;
    res.status(200).json({message:"hii how can i help you",problem:question});
//   try {
//     // 1. Destructure the exact text string from the body object (e.g., { "question": "Hello AI" })
//     const { question } = req.body;

//     if (!question) {
//       return res.status(400).json({ success: false, message: "Question text is required." });
//     }

//     // 2. Await the async execution of the AI generation pipeline
//     const aiContent = await getAiResponse(question);

//     // 3. Return the response back cleanly inside your Express JSON body
//     return res.status(200).json({ 
//       success: true, 
//       message: aiContent 
//     });

//   } catch (error) {
//     console.error("AI Generation Failure:", error);
    
//     // 4. Handle structural runtime failures gracefully without crashing the Node engine
//     return res.status(500).json({ 
//       success: false, 
//       message: "AI did not respond properly.", 
//       error: error.message 
//     });
//   }
}
