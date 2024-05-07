package main

import (
	"go-chat/database"
	"log"
	"net/http"
	"os"
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

	frontend := os.Getenv("FRONTEND_ADDRESS")
	backend := os.Getenv("BACKEND_ADDRESS")
	port := os.Getenv("BACKEND_PORT")

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{frontend},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete},
		AllowCredentials: true,
	})

	server := http.Server{
		Addr:    backend + port,
		Handler: cors.Handler(mux),
	}

	go func() {
		for {
			log.Println("Server Listening at port", port)
			time.Sleep(time.Minute * 1)
		}
	}()

	server.ListenAndServe()
}
