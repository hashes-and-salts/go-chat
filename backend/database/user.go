package database

import "go-chat/model"

func CreateUser(user model.User) {
	DB.Create(&user)
}

func FindUserByUsername(username string) (*model.User, error) {
	user := &model.User{}
	if err := DB.Where("username = ?", username).First(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
