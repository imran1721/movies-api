const request = require('supertest');
import app from '../src/index'; 

describe('API Tests', () => {
    it('should return all movies', async () => {
        const response = await request(app).get('/movies');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should add a new movie', async () => {
        const response = await request(app)
            .post('/movies')
            .send({
                title: 'New Movie',
                director: 'New Director',
                genre: ['Action'],
                rating: 4.5,
                streamingLink: 'http://example.com/new-movie',
                year: 2022,
            });
        expect(response.status).toBe(200);
    });

    it('should delete a movie with a valid ID', async () => {
        const res = await request(app).delete('/movies/1').set('Authorization', `Basic YWRtaW46MTIzNDU=`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual('Movie deleted successfully');
    });

    it('should return 404 if movie with given ID is not found', async () => {
        const res = await request(app).delete('/movies/999').set('Authorization', `Basic YWRtaW46MTIzNDU=`);
        expect(res).toBe(404);
        expect(res.body).toEqual('Movie not found');
    });

    it('should update a movie with valid data', async () => {
        const updatedData = {
            title: 'Updated Movie',
            director: 'New Director',
        };

        const res = await request(app).put('/movies/1').send(updatedData).set('Authorization', `Basic YWRtaW46MTIzNDU=`);
        expect(res).toBe(200);
        expect(res.body).toEqual('Movie updated successfully');
    });
});
