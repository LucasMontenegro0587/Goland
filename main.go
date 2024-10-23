package main

import (
    "encoding/json"
    "net/http"
)

// Estructura para los datos de solicitud
type PasswordRequest struct {
    Length     int  `json:"length"`
    UseLower   bool `json:"useLower"`
    UseUpper   bool `json:"useUpper"`
    UseNumbers bool `json:"useNumbers"`
    UseSymbols bool `json:"useSymbols"`
}

func generatePasswordHandler(w http.ResponseWriter, r *http.Request) {
    var request PasswordRequest

    // Decodificar la solicitud JSON
    err := json.NewDecoder(r.Body).Decode(&request)
    if err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        return
    }

    // Aquí generas la contraseña basada en los parámetros
    password := "generada123" // Simulación de la contraseña generada

    // Enviar la respuesta como JSON
    response := map[string]string{"password": password}
    json.NewEncoder(w).Encode(response)
}

func main() {
    http.HandleFunc("/generate-password", generatePasswordHandler)
    http.ListenAndServe(":4200", nil)
}
