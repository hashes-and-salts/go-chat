package main

import (
	"log"
	"net/http"
	"time"

	"github.com/rs/cors"
)

func main() {

	mux := http.NewServeMux()

	setupRoutes(mux)

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodDelete},
		// AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodDelete},
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
