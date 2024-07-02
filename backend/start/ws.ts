import { WebSocketService } from '#services/web_socket_service'
import app from '@adonisjs/core/services/app'

app.ready(() => {
  WebSocketService.boot()

  WebSocketService.io?.on('connection', (socket) => {
    console.log(socket.id)
  })
})
