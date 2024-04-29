package main

import (
	"go-chat/controller"
	"net/http"
)

func setupRoutes(mux *http.ServeMux) {

	mux.HandleFunc("POST /api/login", controller.LoginHandler)
	mux.HandleFunc("POST /api/register", controller.RegisterHandler)

	mux.HandleFunc("GET /api/user", controller.User)

}
