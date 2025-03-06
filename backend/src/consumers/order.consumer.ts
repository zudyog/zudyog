import { RabbitMQService } from '../services/rabbitmq.service';

export class StockConsumer {
    private rabbitmqService: RabbitMQService;

    constructor() {
        this.rabbitmqService = new RabbitMQService();
    }

    async initialize(): Promise<void> {
        await this.rabbitmqService.connect();
        await this.startConsuming();
    }

    private async startConsuming(): Promise<void> {
        await this.rabbitmqService.consumeMessages('stock_queue', async (message) => {
            // Process the message here
            console.log('Received message:', message);
            // Add your message processing logic here
            await this.processMessage(message);
        });
    }

    private async processMessage(message: any): Promise<void> {
        // Implement your message processing logic here
        // For example: updating database, calling external services, etc.
    }
}
