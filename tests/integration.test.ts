import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/index';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = process.env.DATABASE_URL || ""
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    app.close()
});

const username = "admin";
const password = "12345"

describe('Movies API Integration Tests', () => {
    let movieId: string;

    it('should add a new movie', async () => {
        const response = await request(app)
            .post('/movies')
            .auth(username, password)
            .send({
                title: 'The Matrix',
                director: 'Lana and Lilly Wachowski',
                genre: ['Action', 'Sci-Fi'],
                rating: 4.9,
                streamingLink: 'http://example.com/the-matrix',
                year: 1999,
            });
        expect(response.status).toBe(201);
    });

    it('should return a movie with Specified Title', async () => {
        const response = await request(app).get('/search?q=matrix');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.length).toBeGreaterThan(0);
        movieId = response.body[0]
    });

    it('should return all movies', async () => {
        const response = await request(app).get('/movies');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should update an existing movie', async () => {
        const response = await request(app)
            .put(`/movies/${movieId}`)
            .send({
                title: 'Updated Title',
                director: 'Updated Director',
                genre: ['Action', 'Sci-Fi'],
                rating: 4.8,
                streamingLink: 'http://example.com/updated-movie',
                year: 2000,
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Title');
    });

    it('should delete a movie', async () => {
        const response = await request(app).delete(`/movies/${movieId}`);
        expect(response.status).toBe(204);

        const deletedMovie = await request(app).get(`/movies/${movieId}`);
        expect(deletedMovie.status).toBe(404);
    });
});
