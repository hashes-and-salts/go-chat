package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var clients []*websocket.Conn

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

		log.Println(string(message))

		// err = conn.WriteMessage(msgType, message)

		// if err != nil {
		// 	log.Println("Error while writing message: ", err)
		// }

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

	http.Handle("/", http.FileServer(http.Dir("./app")))

	http.HandleFunc("/chat", chatHandler)

	port := ":8000"
	log.Println("Server listening at ", port)
	log.Fatal(http.ListenAndServe(port, nil))

}
