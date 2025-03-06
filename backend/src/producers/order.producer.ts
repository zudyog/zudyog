import { RabbitMQService } from '../services/rabbitmq.service';

export class StockProducer {
    private rabbitmqService: RabbitMQService;

    constructor() {
        this.rabbitmqService = new RabbitMQService();
    }

    async initialize(): Promise<void> {
        await this.rabbitmqService.connect();
    }

    async sendMessage(data: any): Promise<void> {
        await this.rabbitmqService.publishMessage('stock_queue', data);
    }
}
