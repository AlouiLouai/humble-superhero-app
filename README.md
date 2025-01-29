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
      "name": "Super Humble",
      "superpower": "Flying",
      "humilityScore": 9
    },
    {
      "name": "Mighty Humble",
      "superpower": "Strength",
      "humilityScore": 8
    }
  ]
```
