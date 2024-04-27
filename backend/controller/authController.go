package controller

import (
	"encoding/json"
	"net/http"
	"time"
)

type User struct {
	FirstName       string `json:"firstname"`
	LastName        string `json:"lastname"`
	UserName        string `json:"username"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	var user User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Failed to decode JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	tokenString, err := generateJWT(user)
	if err != nil {
		http.Error(w, "Failed to generate JWT:"+err.Error(), http.StatusInternalServerError)
		return
	}

	cookie := http.Cookie{
		Name:    "jwt",
		Value:   tokenString,
		Path:    "/",
		Expires: time.Now().Add(24 * time.Hour),
	}

	http.SetCookie(w, &cookie)

}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var user User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Failed to decode JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	// add user to database

}
