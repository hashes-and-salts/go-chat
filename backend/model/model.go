package model

import "gorm.io/gorm"

type User struct {
  gorm.Model
	Firstname string
	Lastname  string
	Username  string
	Email     string
	Password  []byte
}
