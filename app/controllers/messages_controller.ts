import type { HttpContext } from '@adonisjs/core/http'
import { QueueService } from '../queue/queue_service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class MessagesController {
  constructor(private readonly queueService: QueueService) {}
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    await this.queueService.initConnection()
    this.queueService.sendMessage('Coucou Pav :)')
    this.queueService.receiveMessage('Pav')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
