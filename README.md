# Notes App

A web application for creating and managing notes with user authentication. This project evolved from [my nodejs cli notes app](https://github.com/Wannabeloved/NodejsCLINotes), transforming it into a full-featured web application using Node.js (Express) server with EJS templating engine and Bootstrap for the frontend.

## Requirements

- Docker
- Docker Compose

## Installation and Launch

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <repo-folder>
```

2. Start the application using Docker Compose:

```bash
docker compose up -d
```

After launch:

- Web application will be available at: http://localhost:3000
- MongoDB will be available at: mongodb://localhost:27017

## Connecting to MongoDB via Compass

If you want to connect to the database using MongoDB Compass, use the following connection string:

```
mongodb://root:example@localhost:27017/notes?authSource=admin
```

Default credentials:

- Username: root
- Password: example
- Database: notes
- Auth Database: admin

## Features

- User registration and authentication
- Create, view, edit, and delete notes
- Each user sees only their own notes
- Protected routes using JWT tokens
- Responsive Bootstrap UI
- Data persistence using MongoDB

## Development

If you want to make changes to the code:

1. Stop the containers:

```bash
docker compose down
```

2. Make your changes

3. Rebuild and start the containers:

```bash
docker compose up -d --build
```

## Important Notes

1. For production, it's recommended to change:

   - MongoDB password (in compose.yaml)
   - JWT_SECRET in constants.js
   - Use secure secret storage

2. MongoDB data is stored in a Docker volume, so it persists even after container restarts

## Tech Stack

- Backend: Node.js with Express
- Database: MongoDB
- View Engine: EJS
- Frontend: Bootstrap
- Authentication: JWT
- Containerization: Docker & Docker Compose
