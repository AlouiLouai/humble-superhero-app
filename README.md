# Humble Superhero API

## Introduction

This project is designed to allow users to create and manage superheroes, each with a name, superpower, and a humility score. The superheroes are stored in-memory and can be retrieved in order of their humility score, from most humble to least humble.

## Technologies Used

  - <b>NestJS :</b> A powerful Node.js framework for building efficient, scalable server-side applications.
  - <b>Fastify :</b> A fast and low-overhead web framework for Node.js, used as the HTTP adapter for NestJS.
  - <b>Jest :</b> A delightful JavaScript testing framework for unit and integration testing.
  - <b>Supertest :</b> For end-to-end testing of HTTP requests.
  - <b>nestjs/config :</b> For managing environment variables.
  - <b>fastify/static :</b> For serving static file as fast as possible. I need that to handle the Swagger UI

## Setup 

1. Clone the Repository
```bash
  git clone https://github.com/AlouiLouai/humble-superhero-app
  cd humble-superhero-app
```

2. Install Dependencies
```bash
  npm install
```

3. Set Up Environment Variables
Before running the app, copy the contents of .env.example to create a new .env file in the root directory. Make sure to configure any environment-specific variables as required.
```bash
  cp .env.example .env
```

4. Run the Application
To start the application in development mode:
```bash
  npm run start:dev
```
This will start the API with hot-reloading for easier development.

5. Testing
  - <b>Unit Tests (Jest):</b> To run the unit tests, use the following command:
```bash
  npm run test
```
  - <b>End-to-End Tests (Supertest):</b> To run end-to-end tests for the API, use:
```bash
  npm run test:e2e
```

6. Logger
The application uses NestJS's built-in logger for better development visibility. You can see logs for incoming requests and errors directly in the console.

## API Endpoints

```bash 
  http://localhost:5000/api/docs 
```
Consult the Swagger documentation UI

OR 

### POST /superheroes

  - Adds a new superhero to the in-memory array.
  - Required fields:
    - <b>name:</b> String (Superhero's name)
    - <b>superpower:</b> String (Superhero's superpower)
    - <b>humilityScore:</b> Number (A rating between 1 and 10 that indicates their humility)
  
  Example Request Body:
```bash
  {
    "name": "Super Humble",
    "superpower": "Flying",
    "humilityScore": 9
  }
```

### GET /superheroes

  - Fetches a list of superheroes, sorted by their humility score in descending order.

  Example Response:
```bash
  [
    {
      "id": "e2c608b2-137c-41e8-9c62-0160287700ed",
      "name": "Super Humble",
      "superpower": "Flying",
      "humilityScore": 9
    },
    {
      "id": "40235d63-12ea-4365-8315-66f44a590a7e",
      "name": "Mighty Humble",
      "superpower": "Strength",
      "humilityScore": 8
    }
  ]
```

## TEAM PLAYER ATTITUDE 

1. Regular code reviews to maintain high-quality standars and ESPECIALLY learn from each other's insights making FAST GROWTH for the team.

2. Engage pair programming when tackling complex features like Apach Kafka pub/sub or WebSocket with BullMQ and real-time update

3. Set up CD to complete the CI/CD automating integration and deployement to for example AWS

4. Make short sessions to discuss best practices for NestJS, Fastify and Redis

## IF I HAD MORE TIME 

1. Database Persistence
  - Replace the in-memory array with writing to Disk using for example PostgresSQL that scale vertically adding more ressources ( GPU, RAM, etc)

2. Authentication & Authorization
  - Integrate AWS Cognito to add user authentication and role-based access control.

3. Real-time Updates
  - Use WebSockets with Socket.IO to push real-time superhero updates to a React frontend.

4. Monitoring & Logging
  - Integrate Datadog or Prometheus for better observability and debugging.

5. Performance Optimization
  - Use Redis for caching frequently accessed superhero data.

6. Docker & Kubernetes Deployment
  - Containerize the application using Docker and deploy it on Kubernetes with a Helm chart.

7. Frontend Improvement
  - Use the chadcn reusable UI component for Input, Card, List, Button, Dialog for better UX
  - Use the Clerk user management API that have all logic for UI and routing and features for auth
  - Maybe convert the UI to be in the left the form of adding superhero and right the list of all superheroes ( Need to figure out the display of card within the left box)
  - load more instead of pagination + implement pagination logic from the backend Nestjs
