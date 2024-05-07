package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Firstname string
	Lastname  string
	Username  string `gorm:"unique"`
	Email     string `gorm:"unique"`
	Password  []byte `json:"-"`
	Posts     []Post `json:"-"`
}

type Post struct {
	gorm.Model `json:"-"`
	Content    string
	UserID     uint `json:"-"`
	User       User
}
