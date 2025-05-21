// process.env["NODE_TLS_REJECT_UNAUTHORIZED"]=0;
const express = require('express');
const path = require('path');
const { OpenAIAPI } = require('./openai');
const cors = require("cors");
const app = express();
const port = process.env.port || 3000; 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/getChatbotResponse', async (req, res) => {
    const userMessage = req.body.userMessage;
    console.log("mm", userMessage)
    // Use OpenAI API to generate a response
    const chatbotResponse = await OpenAIAPI.generateResponse(userMessage);
    // Send the response back to the client
    console.log("res", chatbotResponse)
    res.json({ chatbotResponse });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});