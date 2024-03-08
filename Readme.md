# Movies API

This is a simple API Application for managing movies. It is built using Express.js, TypeScript, and MongoDB.

## Features

- Create a new movie
- Retrieve a list of all movies
- Search a movie by Genre or Title
- Update an existing movie
- Delete a movie

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movies-crud-api.git
   cd movies-crud-api

2. ```bash 
    npm install

3.  Create a .env file in the root directory with the following content: 
    PORT=3000
    DATABASE_URL=<MONGO_DB_URL>

4. Start the Server:
    ```bash
    npm start

5. Run tests:
    ```bash
    npm test

API Endpoints

1.  List all movies\
    Endpoint: **GET /movies**

2.  Search movies by Genre or Title\
    Endpoint: **GET /seach?q={query}**

3.  Add a new movie\
    Endpoint: **POST /movies**\
    Authorization: ``Basic
        Username: admin
        password: 12345``\
    Request Body:
    ```{
        "title": "The Matrix",
        "director": "Lana and Lilly Wachowski",
        "genre": ["Action", "Sci-Fi"],
        "rating": 4.9,
        "streamingLink": "http://example.com/the-matrix",
        "year": 1999
    }

4.  Update an existing movie\
    Endpoint: **PUT /movies/:id**\
    Authorization: ``Basic
        Username: admin
        password: 12345``\
    Request Body:
    ```{
        "title": "Updated Title",
        "director": "Updated Director",
        "genre": ["Action", "Sci-Fi"],
        "rating": 4.8,
        "streamingLink": "http://example.com/updated-movie",
        "year": 2000
    }

5.  Delete a movie\
    Endpoint: **DELETE /api/movies/:id**\
    Authorization: ``Basic
        Username: admin
        password: 12345``