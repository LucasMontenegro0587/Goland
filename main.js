async function generatePassword() {
    const length = document.getElementById("length").value;
    const useLower = document.getElementById("useLower").checked;
    const useUpper = document.getElementById("useUpper").checked;
    const useNumbers = document.getElementById("useNumbers").checked;
    const useSymbols = document.getElementById("useSymbols").checked;

    // Agrega un log para verificar los valores obtenidos
    console.log("Valores obtenidos:");
    console.log("Longitud:", length);
    console.log("Incluir minúsculas:", useLower);
    console.log("Incluir mayúsculas:", useUpper);
    console.log("Incluir números:", useNumbers);
    console.log("Incluir símbolos:", useSymbols);

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

function showChatbot() string {
    document.getElementById("chatbot-section").style.display = "block";
    // Función para procesar la entrada del usuario
    input = strings.ToLower(input)
    switch input {
        case "Hola", "hola":
            return "¡Hola! ¿Cómo te llamás?";
        case "¿Cómo te llamás?", "¿cómo te llamás?", "¿Quién sos?", "¿quién sos?":
            return "Mi nombre es I-Bot, pero podés llamarme como prefieras.";
        case "¿Qué hora es?", "¿qué hora es?", "¿Qué hora es en este momento?", "¿qué hora es en este momento?":
            return obtenerHoraActual();
        case "Adiós", "adiós":
            return "¡Hasta luego y gracias por dejarme ayudarte!";
        case "Ayuda", "ayuda":
            return "Hablemos, ¿qué necesitás?";
        case "Contame un chiste", "contame un chiste", "Decime un chiste", "decime un chiste":
            return contarChiste();
        case "¿Cómo estás?", "¿cómo estás?":
            return "¡Estoy siempre listo para ayudarte! ¿Y vos cómo estás?";
        case "¿Qué podés hacer?", "¿qué podés hacer?", "¿Qué sabés hacer?", "¿qué sabés hacer?", "¿Cuáles son tus habilidades?", "¿cuáles son tus habilidades?":
            return "Puedo responder preguntas sobre mí, darte la hora actual, contarte chistes, y más. ¡Preguntame!";
        case "Dame un consejo", "dame un consejo", "¿Podés darme un consejo?", "¿podés darme un consejo?":
            return "Siempre recuerda ser amable y paciente, ¡eso te llevará lejos!";
        case "Contame algo interesante", "contame algo interesante", "Contame un dato curioso", "contame un dato curioso":
            return "Estoy evolucionando para darte la mejor atención personalizada. Más información próximamente.";
        default:
            return "No entiendo eso, pero estoy para ayudarte. Escribí 'Ayuda/ayuda'";
    }
}

// Función para obtener la hora actual
func obtenerHoraActual() string {
	horaActual := time.Now().Format("15:04")
	return "La hora actual es: " + horaActual.
}

// Función para contar un chiste simple
func contarChiste() string {
	return "¿Por qué la computadora fue al médico? Porque tenía un virus... ¡Jajaja!"
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
