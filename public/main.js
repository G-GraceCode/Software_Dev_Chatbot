const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendMessage = document.getElementById("send_mess")

const displayMessage = (sender, message) => {
    if (message === " " || !message || message === "None") return
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    // Wrap the message in a <p> tag
    if(sender === "user"){
        const messageParagraph = document.createElement('p');
        messageParagraph.innerText = message;
        messageElement.appendChild(messageParagraph);
        chatLog.appendChild(messageElement);
        return
    }
    if (sender === "chatbot"){
        const messageRes = document.createElement('div');
        messageRes.innerHTML = message
        // Append the <p> tag to the message element
        messageElement.appendChild(messageRes);
        chatLog.appendChild(messageElement);
        return
    }

}

const getChatbotResponse = async (userMessage) => {

    const messageParagraph = document.createElement('p');
    messageParagraph.innerText = "Thinking ...";
    chatLog.appendChild(messageParagraph);

    try{
        const res = await fetch('/getChatbotResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage }),
        })
        console.log("res-main", res)
        const data = await res.json()
        displayMessage("chatbot", data.chatbotResponse)
        messageParagraph.innerText = "Show Thinking"
    
    } catch(e){
        alert("Error occurred", e)
        console.log("Error", e)
    }
}

sendMessage.addEventListener("click", () => {
    const message = userInput.value;
    // Display user's message
    displayMessage('user', message);
    // Call OpenAI API to get chatbot's response
    if (message === " " || !message || message === "None"){
        return alert("Please, Enter Text")
    } else{
        getChatbotResponse(message);
    }
    // Clear user input
    userInput.value = '';
})