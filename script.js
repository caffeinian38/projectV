document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
        addMessage(`📁 Uploaded: ${file.name}`, "user");

        // Create FormData to send file
        const formData = new FormData();
        formData.append("file", file);

        // Send file to backend
        fetch("http://127.0.0.1:8000/upload", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            addMessage(`✅ File received: ${data.extracted_text}`, "bot");
        })
        .catch(error => {
            addMessage("❌ Error uploading file.", "bot");
            console.log("Upload error:", error);
        });
    }
});

    window.addEventListener('DOMContentLoaded', async()=>{
        await fetch('http://127.0.0.1:8000/',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    })

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

           // Send message to the backend
            fetch('http://127.0.0.1:8000/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'userInput':userMessage+''}),
            })
                .then(response => response.json())
                .then(data => {
                    addMessage(data+'', 'bot');
                })
                .catch(error => {
                    addMessage('Sorry, something went wrong.', 'bot');
                    console.error('Error:', error);
                });
        }
    });
});

