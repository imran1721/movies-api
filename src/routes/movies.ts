import express, { Router, Request, Response } from 'express'
import basicAuth from 'basic-auth';
import Movies from '../models/movie'

const router = Router()

// Basic Authentication to verify Admin role
const adminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const credentials = basicAuth(req);
    if (!credentials || credentials.name !== 'admin' || credentials.pass !== '12345') {
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
};

// List all the movies in the lobby
router.get('/movies', async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Movies.find())
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
)

// Search for a movie by title or genre
router.get('/search', async (req: Request, res: Response) => {
    const searchQuery = req.query.q as string;
    const allMovies = await Movies.find();
    const searchedResults = allMovies.filter((movie: any) => {
        const hasSearchedTitle = movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
        const hasSeachedGenre = movie.genre.some((eachGenre: any) => eachGenre.toLowerCase().includes(searchQuery.toLowerCase()));
        return hasSearchedTitle || hasSeachedGenre;
    })
    return res.json(searchedResults)
})

// Add a new movie to the lobby (requires "admin" role)
router.post('/movies', adminAuth, async (req: express.Request, res: express.Response) => {
    try {
        const newMovie = await Movies.create(req.body);
        res.status(201).sendStatus(201);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Update an existing movie's information (title, genre, rating, or streaming link)(requires "admin" role)
router.put('/movies/:id', adminAuth, async (req: Request, res: Response) => {
    try {
        res.status(200).json(Movies.findByIdAndUpdate(req.params.id, req.body));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a movie from the lobby (requires "admin" role)
router.delete('/movies/:id', adminAuth, async (req: express.Request, res: express.Response) => {
    res.status(200).json(Movies.findByIdAndDelete(req.params.id));
});


export default router
