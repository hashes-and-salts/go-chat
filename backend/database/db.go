package database

import (
	"fmt"
	"go-chat/model"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() error {

	err := godotenv.Load()
	if err != nil {
		return err
	}

	host := "postgres"
	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")
	port := "5432"

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", host, user, password, dbname, port)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	return nil
}

func AutoMigrate() error {
	err := DB.AutoMigrate(&model.User{}, &model.Post{})
	return err
}
