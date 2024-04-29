package controller

import (
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func generateJWT(user FormData) (string, error) {
	signingKey := []byte(os.Getenv("SECRET_KEY"))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"firstname": user.FirstName,
		"lastname":  user.LastName,
		"username":  user.UserName,
		"email":     user.Email,
	})

	return token.SignedString(signingKey)
}
