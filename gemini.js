require("dotenv").config()
console.log("API Key found:", process.env.GEMINI_API_KEY ? "Yes" : "No")


async function processGeminiOutput (geminiText) {
        // ... (logic using 'marked' library)
        const { marked } = await import('marked'); // Or const marked = require('marked');
        const htmlOutput = marked.parse(geminiText);
        return htmlOutput;
}

class GeminiAPI {
    
    static async generateResponse(userMessage) {
        try {
        // Initialization of GEMINI
        const {GoogleGenAI}  = await import("@google/genai");

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ text: userMessage }],
            config: {
                systemInstruction: "Acts as a Senior Software Engineer, with 20 year experience",
                maxOutputTokens: 200,
                temperature: 0.1,
            },
        });
        
        const {totalTokenCount} = response?.usageMetadata

        // Check if choices array is defined and not empty
        if (response.text && response.text.length > 0) {

            const htmlOutput = await processGeminiOutput(response.text)
            return response.text && totalTokenCount > 0 ? `${htmlOutput} \n ${totalTokenCount} Token Left` : "Sorry, Your Tokens are Finished" ;
        
        } else {
            // Handle the case where choices array is undefined or empty
            
            console.error('Error: No valid response from Gemini API');
            return 'Sorry, I couldn\'t understand that.';
        }
        }
        catch(e){
            console.log("Error-gemi", e)
        }

    }

}

module.exports = {GeminiAPI}