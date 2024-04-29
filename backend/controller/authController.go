package controller

import (
	"encoding/json"
	"go-chat/database"
	"go-chat/model"
	"go-chat/utils"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type FormData struct {
	FirstName       string `json:"firstname"`
	LastName        string `json:"lastname"`
	UserName        string `json:"username"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	var user FormData

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Failed to decode JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	// check if user is in database
	if ok, err := database.CheckIfUserExists(user.UserName, user.Email, user.Password); !ok || err != nil {
		http.Error(w, "could not find user", http.StatusUnauthorized)
		return
	}

	tokenString, err := generateJWT(user)
	if err != nil {
		http.Error(w, "Failed to generate JWT:"+err.Error(), http.StatusInternalServerError)
		return
	}

	cookie := http.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
	}

	http.SetCookie(w, &cookie)

	w.Write([]byte("cookie set! good to go"))

}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var user FormData

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Failed to decode JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	if strings.Compare(user.Password, user.ConfirmPassword) != 0 {
		http.Error(w, "passwords do not match", http.StatusBadRequest)
		return
	}

	hashedPasswordByte, err := utils.HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	dbUser := model.User{
		Firstname: user.FirstName,
		Lastname:  user.LastName,
		Email:     user.Email,
		Username:  user.UserName,
		Password:  hashedPasswordByte,
	}

	database.CreateUser(dbUser)

	w.Write([]byte("registration successful"))

}

func User(w http.ResponseWriter, r *http.Request) {

	log.Println("/api/user called")

	jwtCookie, err := r.Cookie("jwt")
	if err != nil {
		http.Error(w, "jwt token not found "+err.Error(), http.StatusUnauthorized)
		return
	}

	token, err := jwt.Parse(jwtCookie.Value, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if err != nil {
		http.Error(w, "error parsing token "+err.Error(), http.StatusUnauthorized)
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		http.Error(w, "failed to parse jwt claims", http.StatusUnauthorized)
		return
	}

	claimsJSON, err := json.Marshal(claims)
	if err != nil {
		http.Error(w, "error encoding json"+err.Error(), http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(claimsJSON)

}
