const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendMessage = document.getElementById("send_mess")

const displayMessage = (sender, message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    // Wrap the message in a <p> tag
    const messageParagraph = document.createElement('p');
    messageParagraph.innerText = message;
    // Append the <p> tag to the message element
    messageElement.appendChild(messageParagraph);
    chatLog.appendChild(messageElement);
}

const getChatbotResponse = async (userMessage) => {
    try{
        const res = await fetch('/getChatbotResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
        })
        
        res.json().then(data => {
            displayMessage("chatbot", data.chatbotResponse)
        })

    } catch(e){
        alert("Error occurred", e.message)
        console.log("Error", error)
    }
}

sendMessage.addEventListener("click", () => {
    const message = userInput.value;
    // Display user's message
    displayMessage('user', message);
    // Call OpenAI API to get chatbot's response
    getChatbotResponse(message);
    // Clear user input
    userInput.value = '';
})