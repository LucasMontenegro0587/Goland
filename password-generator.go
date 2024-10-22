package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

// Función para generar una contraseña aleatoria
func generatePassword(length int) (string, error) {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"
	password := make([]byte, length)

	for i := range password {
		randomIndex, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			return "", err
		}
		password[i] = charset[randomIndex.Int64()]
	}

	return string(password), nil
}

func main() {
	// Especifica la longitud de la contraseña
	var length int
	fmt.Print("Ingrese la longitud de la contraseña: ")
	fmt.Scanf("%d", &length)

	// Genera la contraseña
	password, err := generatePassword(length)
	if err != nil {
		fmt.Println("Error al generar la contraseña:", err)
		return
	}

	fmt.Println("Contraseña generada:", password)
}
