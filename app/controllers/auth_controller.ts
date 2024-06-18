import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { QueueService } from '../queue/queue_service.js'
import User from '#models/user'
import { loginValidator, registrationValidator } from '#validators/auth'

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

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    return user
  }
}
