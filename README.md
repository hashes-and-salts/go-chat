# go-chat
A basic real-time chat application with a simple HTML/JavaScript frontend and a Go backend using websockets.

### Backend
- [Go](https://go.dev)
- [Gorilla WebSocket](https://github.com/gorilla/websocket)
- [Gin](https://gin-gonic.com/)

### Frontend:
- HTML/JS/CSS
- [Bootstrap](https://getbootstrap.com/)

### Running the app
- clone the repo

- `cd` into `backend`

- Define `ipAddress` inside `static/index.html`
```javascript
    const ipAddress = "" // Replace with IP address of your server
    const websocket = new WebSocket(`ws://${ipAddress}:8000/start-chat`)
```
- Download necessary modules
`go mod download && go mod verify`

- Run the app
`go run main.go`

- In a browser, go to the url
    * `localhost:8000` if running on the same machine
    * `[IP_ADDRESS]:8000` if running on a different machine

- To test chat, open multiple browser windows or tabs
