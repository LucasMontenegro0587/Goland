package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("Hola! Soy I-Bot, tu ChatBot acompañante. ¿Cómo te puedo ayudar?")

	for {
		fmt.Print("Tu: ")
		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)
		respuesta := procesarEntrada(input)
		fmt.Println("Chatbot:", respuesta)

		if strings.ToLower(input) == "adiós" {
			fmt.Println("Chatbot: ¡Hasta pronto!")
			break
		}
	}
}

// Función para procesar la entrada del usuario
func procesarEntrada(input string) string {
	input = strings.ToLower(input)
	switch input {
	case "Hola", "hola":
		return "¡Hola! ¿Cómo te llamás?"
	case "¿Cómo te llamás?", "¿cómo te llamás?", "¿Quién sos?", "¿quién sos?":
		return "Mi nombre es I-Bot, podés llamarme como prefieras."
	case "¿Qué hora es?", "qué hora es?":
		return obtenerHoraActual()
	case "Adiós", "adiós":
		return "¡Hasta luego y gracias por dejarme ayudarte!"
	case "Ayuda", "ayuda":
		return "Podés preguntarme: '¿Cómo te llamás?', '¿Qué hora es?', 'Contame un chiste', o simplemente decir 'Adiós' para despedirte."
	case "Contame un chiste", "contame un chiste", "Decime un chiste", "decime un chiste":
		return contarChiste()
	case "¿cómo estás?", "¿cómo estás?":
		return "¡Estoy siempre listo para ayudarte! ¿Y vos cómo estás?"
	default:
		return "No entiendo eso, pero acá estoy. Escribí 'ayuda' para ver qué cosas puedo hacer."
	}
}

// Función para obtener la hora actual
func obtenerHoraActual() string {
	horaActual := time.Now().Format("15:04")
	return "La hora actual es: " + horaActual
}

// Función para contar un chiste simple
func contarChiste() string {
	return "¿Por qué la computadora fue al médico? Porque tenía un virus... ¡Jajaja!"
}
