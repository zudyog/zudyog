
### Install dependencies
```bash
  yarn
  OR
  npm install
```
### Run app
```bash
  yarn dev
  OR
  npm run dev
```

### To run MongoDB using Docker, use the following command: 
```bash
docker run -d \
  --name nextstockdb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=adminpassword \
  -v mongo_data:/data/db \
  mongo:latest
```

#### Explanation of Flags:

- `-d` → Runs the container in detached mode (background).
- `--name raptaidb` → Names the container mongodb.
- `-p 27017:27017` → Maps MongoDB’s default port to the host machine.
- `-e MONGO_INITDB_ROOT_USERNAME=admin` → Sets the root username.
- `-e MONGO_INITDB_ROOT_PASSWORD=adminpassword` → Sets the root password.
- `-v mongo_data:/data/db` → Persists database data using a Docker volume.
- `mongo:latest` → Uses the latest MongoDB image.

### Connecting to MongoDB
You can connect to MongoDB using:
```bash
raptaidb://admin:adminpassword@localhost:27017
```

## RabbitMq
```bash
  docker run -d --name rabbitmq \
    -p 5672:5672 \
    -p 15672:15672 \
    -e RABBITMQ_DEFAULT_USER=myuser \
    -e RABBITMQ_DEFAULT_PASS=mypassword \
    rabbitmq:management
```

## redis
```bash
  docker run -d --name redis-server -p 6379:6379 redis
```

## usage
```javascript
import { ExampleProducer } from './producers/example.producer';
import { ExampleConsumer } from './consumers/example.consumer';

// Initialize producer
const producer = new ExampleProducer();
await producer.initialize();

// Send a message
await producer.sendMessage({ 
    type: 'example',
    data: { 
        id: 1,
        message: 'Hello RabbitMQ!'
    }
});

// Initialize consumer
const consumer = new ExampleConsumer();
await consumer.initialize();

```

```javascript
  // Example service function
  const externalServiceCall = async (req: Request) => {
      const response = await fetch('https://external-api.example.com/data');
      if (!response.ok) {
          throw new Error('Service unavailable');
      }
      return response.json();
  };

  // Apply middleware to route
  app.get('/api/protected-route',
      circuitBreakerMiddleware(externalServiceCall),
      (req: Request, res: Response) => {
          res.json(res.locals.result);
      }
  );
```

This implementation provides:

- Circuit breaker pattern with three states: Closed, Open, and Half-Open
- Retry mechanism with exponential backoff
- Configurable failure threshold (5 consecutive failures)
- Recovery attempt after 10 seconds (half-open state)
- Logging for monitoring circuit breaker state changes
- Middleware pattern for easy reuse across multiple routes

The circuit breaker will:

- Allow requests normally when closed
- Stop requests immediately when open (after 5 consecutive failures)
- Allow a single request through after 10 seconds to test if the service has recovered
- Reset to closed state if the test request succeeds
- Remain open if the test request fails

