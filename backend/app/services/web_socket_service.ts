import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

export class WebSocketService {
  static io: Server | undefined
  private static booted = false

  static boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return
    }

    this.io = new Server(server.getNodeServer(), {
      cors: {
        origin: '*',
      },
    })

    this.booted = true
  }
}

export default new WebSocketService()
