package main

import (
	"crypto/rand"
	"flag"
	"fmt"
	"math/big"
	"net/http"
	"strconv"
	"os"
)

type PasswordRequest struct {
	Length     int  `json:"length"`
	UseLower   bool `json:"useLower"`
	UseUpper   bool `json:"useUpper"`
	UseNumbers bool `json:"useNumbers"`
	UseSymbols bool `json:"useSymbols"`
}

type PasswordResponse struct {
	Password string `json:"password"`
	Error    string `json:"error,omitempty"`
}

// Función para la generación de una contraseña aleatoria
func generatePassword(length int, useLower, useUpper, useNumbers, useSymbols bool) (string, error) {
	// Definición de los conjuntos de caracteres permitidos
	lowercase := "abcdefghijklmnopqrstuvwxyz"
	uppercase := "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	numbers := "0123456789"
	symbols := "!@#$%&*"
	charset := ""

	// Concatenación de caracteres permitidos según las opciones
	if useLower {
		charset += lowercase
	}
	if useUpper {
		charset += uppercase
	}
	if useNumbers {
		charset += numbers
	}
	if useSymbols {
		charset += symbols
	}

	// Validación para que el conjunto de caracteres no esté vacío
	if charset == "" {
		return "", fmt.Errorf("Seleccioná algún tipo de carácter para la contraseña")
	}

	// Slice para almacenar la contraseña generada
	password := make([]byte, length)
	maxRetries := 5

	for i := range password {
		retries := 0
		for {
			randomIndex, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
			if err == nil {
				password[i] = charset[randomIndex.Int64()]
				break
			}
			retries++
			if retries >= maxRetries {
				return "", fmt.Errorf("error al generar la contraseña después de %d intentos: %v", maxRetries, err)
			}
		}
	}

	return string(password), nil
}

// Controlador para manejar la solicitud de generación de contraseñas
func passwordHandler(w http.ResponseWriter, r *http.Request) {
	var req PasswordRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Solicitud inválida", http.StatusBadRequest)
		return
	}

	password, err := generatePassword(req.Length, req.UseLower, req.UseUpper, req.UseNumbers, req.UseSymbols)
	resp := PasswordResponse{
		Password: password,
	}

	if err != nil {
		resp.Error = err.Error()
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func main() {
	// Definición y parseo de los flags para las opciones de línea de comandos
	length := flag.Int("length", 12, "Longitud de la contraseña")
	useLower := flag.Bool("lower", true, "Incluir letras minúsculas")
	useUpper := flag.Bool("upper", true, "Incluir letras mayúsculas")
	useNumbers := flag.Bool("numbers", true, "Incluir números")
	useSymbols := flag.Bool("symbols", true, "Incluir símbolos")

	flag.Parse()

	// Validación de la longitud de la contraseña
	if *length <= 0 {
		fmt.Println("La longitud de la contraseña debe ser mayor a 0")
		os.Exit(1)
	}

	// Generación de la contraseña
	password, err := generatePassword(*length, *useLower, *useUpper, *useNumbers, *useSymbols)
	if err != nil {
		fmt.Println("Error al generar la contraseña:", err)
		os.Exit(1)
	}

	fmt.Println("Contraseña generada:", password)

	http.HandleFunc("/generate-password", passwordHandler)
	fmt.Println("Servidor en ejecución en http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
