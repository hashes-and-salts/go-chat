package routes

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var clients []*websocket.Conn

func SetupRoutes(engine *gin.Engine) {
	engine.Static("/static", "./static")

	engine.GET("/", func(ctx *gin.Context) {
		ctx.File("./static/login.html")
	})

	engine.POST("/login", func(ctx *gin.Context) {

		username := ctx.PostForm("username")
		if username == "" {
			ctx.Redirect(http.StatusSeeOther, "/")
		}

		cookie := http.Cookie{
			Name:  "username",
			Value: username,
		}
		http.SetCookie(ctx.Writer, &cookie)

		ctx.Redirect(http.StatusSeeOther, "/home")

	})

	engine.GET("/home", func(ctx *gin.Context) {
		ctx.File("./static/index.html")
	})

	engine.GET("/start-chat", func(ctx *gin.Context) {
		conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
		if err != nil {
			log.Println("error ", err)
			ctx.AbortWithError(http.StatusInternalServerError, err)
			return
		}

		clients = append(clients, conn)

		defer conn.Close()
		for {
			messageType, message, err := conn.ReadMessage()
			if err != nil {
				ctx.AbortWithError(http.StatusInternalServerError, err)
				return
			}

			for _, client := range clients {
				err := client.WriteMessage(messageType, message)

				if err != nil {
					log.Println("error writing message: ", err)
				}
			}

		}

	})
}
