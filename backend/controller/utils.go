package controller

import (
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func generateJWT(user User) (string, error) {
	signingKey := []byte(os.Getenv("SECRET_KEY"))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.UserName,
	})

	return token.SignedString(signingKey)
}
