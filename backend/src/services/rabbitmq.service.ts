import * as amqp from 'amqplib';

export class RabbitMQService {
    private connection: amqp.ChannelModel | null = null;
    private channel: amqp.Channel | null = null;

    constructor(private readonly url: string = process.env.RABBITMQ_URL || 'amqp://localhost') { }

    async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(this.url);
            this.channel = await this.connection.createChannel();

            // Handle connection closure
            this.connection.on('close', () => {
                console.log('RabbitMQ connection closed');
                this.reconnect();
            });

            console.log('Connected to RabbitMQ');
        } catch (error) {
            console.error('RabbitMQ connection error:', error);
            throw error;
        }
    }

    private async reconnect(): Promise<void> {
        try {
            await this.connect();
        } catch (error) {
            console.error('RabbitMQ reconnection failed:', error);
            // Implement exponential backoff retry logic here
            setTimeout(() => this.reconnect(), 5000);
        }
    }

    async publishMessage(queue: string, message: any): Promise<void> {
        try {
            if (!this.channel) {
                throw new Error('Channel not established');
            }

            await this.channel.assertQueue(queue, {
                durable: true // Queue survives broker restart
            });

            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
                persistent: true // Message survives broker restart
            });
        } catch (error) {
            console.error('Error publishing message:', error);
            throw error;
        }
    }

    async consumeMessages(queue: string, callback: (message: any) => Promise<void>): Promise<void> {
        try {
            if (!this.channel) {
                throw new Error('Channel not established');
            }

            await this.channel.assertQueue(queue, {
                durable: true
            });

            // Only process one message at a time
            await this.channel.prefetch(1);

            console.log(`Waiting for messages in queue: ${queue}`);

            await this.channel.consume(queue, async (msg) => {
                if (msg) {
                    try {
                        const content = JSON.parse(msg.content.toString());
                        await callback(content);
                        this.channel?.ack(msg); // Acknowledge message processing
                    } catch (error) {
                        console.error('Error processing message:', error);
                        // Reject the message and requeue it
                        this.channel?.nack(msg, false, true);
                    }
                }
            });
        } catch (error) {
            console.error('Error consuming messages:', error);
            throw error;
        }
    }

    async closeConnection(): Promise<void> {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await this.connection.close();
            }
        } catch (error) {
            console.error('Error closing RabbitMQ connection:', error);
            throw error;
        }
    }
}
