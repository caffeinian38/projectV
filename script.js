document.addEventListener("DOMContentLoaded", () => {
    const chatBody = document.getElementById("chat-body");
    const messageInput = document.getElementById("message-input");
    const chatForm = document.getElementById("chat-form");

    // Function to add a message to the chat
    function addMessage(text, sender = "user") {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");

        const messageText = document.createElement("div");
        messageText.classList.add("message-text");
        messageText.textContent = text;

        messageDiv.appendChild(messageText);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Handle form submission
    chatForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        const userMessage = messageInput.value.trim();

        if (userMessage) {
            addMessage(userMessage, "user");
            messageInput.value = "";

            try{
                const res = await fetch('', {
                    method: 'POST',
                    body: JSON.stringify({inp: userMessage}),
                })

                if(res.ok){
                    addMessage(res, 'bot')
                }
            }
            catch(err){
                addMessage("Something went Wrong! Sorry for the inconvenience, Please try again!", 'bot')
                console.log(err)
            }


            
            // Simulate bot response
            setTimeout(() => {
                addMessage("I'm an AI bot. You said: " + userMessage, "bot");
            }, 500);
        }
    });
});

