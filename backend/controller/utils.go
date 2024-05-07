package controller

import (
	"errors"
	"go-chat/model"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func generateJWT(user *model.User) (string, error) {
	signingKey := []byte(os.Getenv("SECRET_KEY"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"firstname": user.Firstname,
		"lastname":  user.Lastname,
		"username":  user.Username,
		"email":     user.Email,
	})
	return token.SignedString(signingKey)
}

func getUserFromJWT(jwtToken string) (*model.User, error) {

	token, err := jwt.Parse(jwtToken, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("failed to parse claims")
	}

	firstname := claims["firstname"].(string)
	lastname := claims["lastname"].(string)
	email := claims["email"].(string)
	username := claims["username"].(string)

	return &model.User{
		Firstname: firstname,
		Lastname:  lastname,
		Email:     email,
		Username:  username,
	}, nil

}
