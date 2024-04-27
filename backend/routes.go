package main

import (
	"go-chat/controller"
	"net/http"
)

func setupRoutes(mux *http.ServeMux) {

	mux.HandleFunc("GET /login", controller.LoginHandler)
	mux.HandleFunc("POST /register", controller.RegisterHandler)

}
