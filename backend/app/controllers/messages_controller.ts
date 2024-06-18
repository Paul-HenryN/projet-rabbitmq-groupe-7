import type { HttpContext } from '@adonisjs/core/http'
import { QueueService } from '../queue/queue_service.js'
import { inject } from '@adonisjs/core'
import { createMessageValidator } from '#validators/message'

@inject()
export default class MessagesController {
  constructor(private readonly queueService: QueueService) {}
  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { content } = await request.validateUsing(createMessageValidator)
    await this.queueService.initConnection()
    await this.queueService.sendMessage(content)
  }
}
