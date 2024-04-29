package main

import (
	"go-chat/database"
	"log"
	"net/http"
	"time"

	"github.com/rs/cors"
)

func main() {

	err := database.Init()
	if err != nil {
		log.Fatal("Error connecting to database", err)
		return
	}
	log.Println("Database connection successful")

	err = database.AutoMigrate()
	if err != nil {
		log.Fatal("Error migrating database", err)
		return
	}
	log.Println("database migration successful")

	mux := http.NewServeMux()

	setupRoutes(mux)

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://0.0.0.0:7000"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete},
		AllowCredentials: true,
	})

	server := http.Server{
		Addr:    "0.0.0.0:8080",
		Handler: cors.Handler(mux),
	}

	go func() {
		for {
			log.Println("Server Listening at port :8080")
			time.Sleep(time.Minute * 1)
		}
	}()

	server.ListenAndServe()
}
