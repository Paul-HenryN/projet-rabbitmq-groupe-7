import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { QueueService } from '../services/queue_service.js'
import User from '#models/user'
import { loginValidator, registrationValidator } from '#validators/auth'
import { WebSocketService } from '#services/web_socket_service'

const onlineUsers: User[] = []

@inject()
export default class AuthController {
  constructor(private readonly queueService: QueueService) {}

  async register({ request }: HttpContext) {
    const payload = await request.validateUsing(registrationValidator)
    const user = await User.create(payload)

    await this.queueService.initConnection()
    await this.queueService.createQueue(user.username)

    return user
  }

  async login({ request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    WebSocketService.io?.emit('login', { user })

    onlineUsers.push(user)

    await this.queueService.initConnection()

    await this.queueService.createQueue(user.username)

    await this.queueService.registerMessageListener(user.username, (message) => {
      const messageObject = JSON.parse(message?.content.toString()!)

      if (!message) {
        return
      }

      if (messageObject.sender.id === user.id) {
        console.log(`${user.username} sent: ${messageObject.content}`)
      } else {
        console.log(`${user.username} received: ${messageObject.content}`)
      }

      WebSocketService.io?.emit(user.username, { message: messageObject })
    })

    return user
  }

  async logout({ auth }: HttpContext) {
    const user = auth.use('web').user
    await auth.use('web').logout()

    WebSocketService.io?.emit('logout', { user_id: user?.id })
    onlineUsers.splice(
      onlineUsers.findIndex((user) => user.id === auth.user?.id),
      1
    )
  }

  async user({ auth }: HttpContext) {
    return auth.use('web').user
  }

  async onlineUsers() {
    return onlineUsers
  }
}
