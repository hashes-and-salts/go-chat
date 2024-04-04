const url = "ws://" + window.location.host +  "/chat"
const webSocket = new WebSocket(url)

const username = prompt("Set Username: ")

const inputMessageBox = document.getElementById("message-input-box")

const messagesArea = document.getElementById("messages-area")


var now = new Date()

webSocket.onclose = () => {
    webSocket.send(username+ " left...")
}

webSocket.onmessage = (event) => {
    messagesArea.innerText += event.data + "\n"
}



function sendMessage() {
    msg = inputMessageBox.value
    webSocket.send("<"+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() +" "+username + "> " + msg)
    inputMessageBox.value = ""
}