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

function showChatbot(input string) string {
            document.getElementById("chatbot-section").style.display = "block";
    // Función para procesar la entrada del usuario
	input = strings.ToLower(input)
	switch input {
	case "hola":
		return "¡Hola! ¿Cómo te llamás?"
	case "¿cómo te llamás?", "quién sos":
		return "Mi nombre es I-Bot, podés llamarme como prefieras."
	case "¿qué hora es?", "qué hora es en este momento?":
		return obtenerHoraActual()
	case "adiós":
		return "¡Hasta luego y gracias por dejarme ayudarte!"
	case "ayuda":
		return "Podés preguntarme: '¿Cómo te llamás?', '¿Qué hora es?', 'cuéntame un chiste', o simplemente decir 'adiós' para despedirte."
	case "cuéntame un chiste", "dime un chiste":
		return contarChiste()
	case "¿cómo estás?", "cómo estás":
		return "¡Estoy siempre listo para ayudarte! ¿Y vos cómo estás?"
	default:
		return "No entiendo eso, pero aquí estoy para ayudarte. Escribí 'ayuda' para ver qué cosas puedo hacer."
	}
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
