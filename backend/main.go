package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/websocket"
	"github.com/rs/cors"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var clients []*websocket.Conn

type User struct {
	Username string `json:"username"`
}

var activeUsers []string

func registerHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("register user called")

	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Fatal("Error reading username")
	}

	userAlreadyRegistered := 0
	for _, usr := range activeUsers {
		if strings.Compare(usr, user.Username) == 0 {
			userAlreadyRegistered = 1
		}
	}

	if userAlreadyRegistered == 0 {
		activeUsers = append(activeUsers, user.Username)
	}

	json.NewEncoder(w).Encode(activeUsers)
}

func chatHandler(w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)

	clients = append(clients, conn)

	if err != nil {
		log.Println("Error during connection: ", err)
		return
	}

	for {
		msgType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error while reading message: ", err)
			return
		}

		for _, client := range clients {
			// client.wr
			err := client.WriteMessage(msgType, message)

			if err != nil {
				log.Println("Error writing response: ", err)
			}
		}

	}

}

func main() {

	mux := http.NewServeMux()
	setupRoutes(mux)

	handler := cors.Default().Handler(mux)

	go func() {
		for {
			log.Println("Active Users: ", activeUsers)
			time.Sleep(time.Minute)
		}
	}()

	port := ":8000"
	log.Println("Server listening at ", port)
	log.Fatal(http.ListenAndServe(port, handler))

}

func pingHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Pong!\n")
}

func setupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/ping", pingHandler)
	mux.HandleFunc("/chat", chatHandler)
	mux.HandleFunc("GET /get-online-users", getOnlineUsersHandler)
	mux.HandleFunc("POST /register-user", registerHandler)
}

func getOnlineUsersHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(activeUsers)
}
