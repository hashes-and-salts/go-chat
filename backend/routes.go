package main

import (
	"go-chat/controller"
	"net/http"
)

func setupRoutes(mux *http.ServeMux) {

	// authentication
	mux.HandleFunc("POST /api/register", controller.RegisterHandler)
	mux.HandleFunc("POST /api/login", controller.LoginHandler)
	mux.HandleFunc("GET /api/user", controller.User)

	// user actions
	mux.HandleFunc("POST /api/post/create", controller.CreatePostHandler)
	mux.HandleFunc("GET /api/post/get", controller.GetPostsHandler)

}
