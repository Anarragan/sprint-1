# Task Manager API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A robust REST API for task management built with NestJS, featuring JWT authentication, user management, and comprehensive task operations.

## Description

This is a Task Manager API built with NestJS that provides a complete backend solution for managing tasks with user authentication. The API includes user registration/login, JWT-based authentication, and full CRUD operations for tasks with user-specific access control.

## Features

- **User Authentication**: Registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **User-specific Tasks**: Each user can only access their own tasks
- **Data Validation**: Input validation using class-validator
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Database Integration**: PostgreSQL with TypeORM
- **Security**: Password hashing with bcrypt
- **Modern Architecture**: Clean, modular NestJS structure

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest

## Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

## Environment Setup

1. Copy the environment example file:
```bash
cp .env.example .env
```

2. Configure your environment variables in `.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_DATABASE=task_manager

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRATION=1d

# Application
PORT=3000
NODE_ENV=development
```

## Installation & Running

1. Install dependencies:
```bash
npm install
```

2. Set up your PostgreSQL database and configure the `.env` file

3. Run the application:
```bash
# development mode
npm run start

# watch mode (recommended for development)
npm run start:dev

# production mode
npm run start:prod
```

The application will be available at:
- **API**: `http://localhost:3000`
- **Swagger Documentation**: `http://localhost:3000/api`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token

### Tasks (Protected routes - require JWT token)
- `GET /tasks` - Get all tasks for the authenticated user
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task by ID
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Request/Response Examples

#### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Create Task (requires Authorization header)
```bash
POST /tasks
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "completed": false
}
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov

# watch mode for tests
npm run test:watch
```

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data Transfer Objects
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── jwt.strategy.ts  # JWT authentication strategy
├── tasks/               # Tasks module
│   ├── dto/            # Data Transfer Objects
│   ├── task.entity.ts  # Task database entity
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── users/              # Users module
│   ├── user.entity.ts  # User database entity
│   ├── users.service.ts
│   └── users.module.ts
├── app.module.ts       # Root application module
└── main.ts            # Application entry point
```

## Database Schema

### Users Table
- `id` (Primary Key)
- `name` (string, max 100 chars)
- `email` (string, unique, max 100 chars)
- `password` (string, hashed, max 100 chars)

### Tasks Table
- `id` (Primary Key)
- `title` (string, max 200 chars)
- `description` (text, optional)
- `completed` (boolean, default: false)
- `user_id` (Foreign Key to Users)

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated using class-validator
- **Route Protection**: Protected routes require valid JWT tokens
- **User Isolation**: Users can only access their own tasks

## Development Guidelines

1. **Code Style**: Follow the established ESLint and Prettier configurations
2. **Testing**: Write unit tests for services and controllers
3. **Documentation**: Update Swagger decorators when adding new endpoints
4. **Environment Variables**: Never commit sensitive data; use environment variables
5. **Database Migrations**: Use TypeORM migrations for database schema changes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io/)
- [JWT.io](https://jwt.io/) - JWT token debugger
- [Swagger/OpenAPI](https://swagger.io/) - API documentation
