async function generatePassword() {
    const length = document.getElementById("length").value;
    const useLower = document.getElementById("useLower").checked;
    const useUpper = document.getElementById("useUpper").checked;
    const useNumbers = document.getElementById("useNumbers").checked;
    const useSymbols = document.getElementById("useSymbols").checked;

    const requestData = {
        length: parseInt(length, 10),
        useLower: useLower,
        useUpper: useUpper,
        useNumbers: useNumbers,
        useSymbols: useSymbols
    };

    try {
        const response = await fetch("http://localhost:8080/generate-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        if (data.error) {
            alert("Error: " + data.error);
        } else {
            document.getElementById("password").innerText = "Contraseña generada: " + data.password;
        }
    } catch (error) {
        alert("Error al conectar con el servidor: " + error);
    }
}

async function sendMessageToChatbot() {
    const message = document.getElementById("userMessage").value;
    if (message.trim() === "") {
        alert("Por favor, escribí un mensaje.");
        return;
    }

    const requestData = {
        message: message
    };

    try {
        const response = await fetch("http://localhost:8080/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });
        const data = await response.json();
        document.getElementById("chatHistory").innerHTML += `<p><strong>Tu:</strong> ${message}</p>`;
        document.getElementById("chatHistory").innerHTML += `<p><strong>Chatbot:</strong> ${data.response}</p>`;
        document.getElementById("userMessage").value = "";
    } catch (error) {
        alert("Error al conectar con el chatbot: " + error);
    }
}
