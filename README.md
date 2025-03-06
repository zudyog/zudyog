# Full Stack Application

This repository contains a full-stack web application built using modern technologies for both the frontend and backend. The application is designed to be scalable, maintainable, and efficient, leveraging a robust tech stack that includes React.js, Next.js, Material-UI, Redux-Toolkit, Node.js, Express.Js and Mongodb.

## Tech Stack

### Frontend

- **React.js**: A JavaScript library for building interactive user interfaces.
- **Next.js**: A React framework that enables server-side rendering (SSR) and static site generation (SSG) for better performance and SEO.
- **Material-UI**: A React UI framework that provides pre-built, customizable components following Google's Material Design principles.
- **Redux-Toolkit**: A state management library that simplifies Redux development with a more efficient and structured approach.
- **LogRocket**: Log errors to a remote logging service using LogRocket for monitoring and debugging.
- **NextAuth**: provides a simple, flexible, and secure way to implement authentication in Next.js applications,

### Backend

- **Typescript**: A high-level programming language known for its simplicity and versatility.
- **Express.Js**: A modern web framework for building APIs high performance.
- **Node.js**: A free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.
- **Compression** : Compression middleware reduces the size of HTTP responses sent from your ExpressJS server to clients, such as web browsers or mobile devices.
- **amqplib**: Used to create clients for Advanced Message Queuing Protocol (AMQP).
- **bcryptjs**: allowing you to use the hash encryption.
- **Cockatiel**: Cockatiel is resilience and transient-fault-handling library that allows developers to express policies such as Retry, Circuit Breaker, Timeout, Bulkhead Isolation, and Fallback.
- **CORS**: CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
- **helmet**: Help secure Express apps by setting HTTP response headers.
- **Ioredis**: Ioredis is a Redis client for Node.js
- **Jsonwebtoken**: Provides developers with an easy to use library to generate JSON Web Tokens that can be used in authentication and authorization tasks
- **Mongoose**: Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

### Database

- **Mongodb**: A powerful, open-source database management system (NoSQL) known for its performance, scalability, and reliability.

### Docker
Package and run applications in isolated containers,

## Features

- Full authentication system (JWT-based authentication and authorization)
- RESTful API built with Express.Js
- Frontend with dynamic and static page generation using Next.js
- State management with Redux-Toolkit for a predictable and maintainable application state
- Material-UI components for a modern and responsive UI design
- Mongodb database integration with optimized queries
- Deployment-ready architecture that can be easily containerized using Docker
- Implementing robust error handling mechanisms in a React application
    1. Error Boundaries for Component-Level Errors
    2. Handling API Errors
    3. Global Error Handling with Context API
    4. Logging Errors using logrocket
- Implementing cache solutions using Redis
    - caching large amounts of data in redis cache
- Implementing message queue solutions using RabbitMQ
    - Use message queues for asynchronous communication between services, ensuring decoupling and reliability.
- Circuit Breaker Pattern
    - Prevent a network or service failure from cascading to other services.
- clustering strategies
    - Implementing clustering strategies for enhancing application performance and fault tolerance.


## Installation and Setup

### Prerequisites

- Ensure you have the following installed:
- Node.js 20.0+ (for backend and frontend development)
- Mongodb (for database management)

## Backend Setup
1. Clone the repository:
```bash
    git clone https://github.com/balajihambeere/raptai.git
    cd raptai
    cd fast-next-app/backend
```
2. Install dependencies:
```bash
    yarn 
    OR
    npm install
```
4. Run the Express server:
```bash
    yarn dev
```
The API should now be running at http://localhost:3200.

## Frontend Setup
1. Navigate to the frontend directory:
```bash
    cd ../frontend
```

2. Install dependencies:
```bash
    npm install
    or
    yarn
```
3. Start the development server:
```bash
    npm run dev
    OR 
    yarn dev
```
The application should now be accessible at http://localhost:3000.

## API Documentation
Provides API documentation, which can be accessed at:

- Swagger UI: http://localhost:3200/api-docs/

## Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -m "Add feature")
4. Push to the branch (git push origin feature-name)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any questions or suggestions, feel free to open an issue or reach out via GitHub Discussions.