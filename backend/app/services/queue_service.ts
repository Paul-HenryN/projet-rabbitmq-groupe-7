import amqp from 'amqplib'

export class QueueService {
  connection?: amqp.Connection
  channel?: amqp.Channel
  exchangeName: string = 'direct_exchange'
  routingKey: string = 'key'

  constructor() {}

  async initConnection() {
    this.connection = await amqp.connect('amqp://localhost')
    this.channel = await this.connection.createChannel()
    await this.channel.assertExchange(this.exchangeName, 'direct', { durable: false })
  }

  async createQueue(queueName: string) {
    await this.channel?.assertQueue(queueName, { durable: false })
    await this.channel?.bindQueue(queueName, this.exchangeName, this.routingKey)
  }

  async sendMessage(message: string) {
    this.channel?.publish(this.exchangeName, this.routingKey, Buffer.from(message))
  }

  async registerMessageListener(
    queueName: string,
    callback: (message: amqp.ConsumeMessage | null) => void
  ) {
    this.channel?.consume(queueName, callback, { noAck: true })
  }
}
