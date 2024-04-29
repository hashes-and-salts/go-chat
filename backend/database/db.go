package database

import (
	"fmt"
	"go-chat/model"
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
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
	return DB.AutoMigrate(&model.User{})
}

func CreateUser(user model.User) {
	DB.Create(&user)
}

// TODO change function name
func CheckIfUserExists(username, email, password string) (bool, error) {
	// DB.First(&user)
	var user model.User

	if err := DB.Where("username = ? OR email = ?", username, email).First(&user).Error; err != nil {
    log.Println("user's record not found in database")
		return false, err
	}

  if err := bcrypt.CompareHashAndPassword(user.Password, []byte(password)); err != nil {
    return false, err
  }

	return true, nil
}
