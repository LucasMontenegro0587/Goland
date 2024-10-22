package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("Hola! Soy tu chatbot, como puedo ayudarte hoy?")

	for {
		fmt.Print("Tu: ")
		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)
		respuesta := procesarEntrada(input)
		fmt.Println("Chatbot:", respuesta)

		if strings.ToLower(input) == "adios" {
			fmt.Println("Chatbot: Hasta luego!")
			break
		}
	}
}

func procesarEntrada(input string) string {
	input = strings.ToLower(input)
	switch input {
	case "hola":
		return "Hola! Como te llamas?"
	case "como te llamas?":
		return "Soy un chatbot sin nombre. Pero tu puede llamarme chatbot."
	case "que hora es?":
		return "Lo siento, aun no tengo un reloj."
	case "adios":
		return "Hasta luego!"
	default:
		return "No entiendo eso, pero aqui estoy para ayudarte."

	}

}
