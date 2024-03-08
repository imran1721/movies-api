import express from 'express'
import mongoose from 'mongoose';
import movieRoutes from './routes/movies'
import apicache from 'apicache';
import dotenv from 'dotenv'
dotenv.config()

let cache = apicache.middleware;
const app = express()
const port = process.env.PORT || 3000
const mongoString = process.env.DATABASE_URL

if (!mongoString) {
    console.error('MongoDB connection string is not defined.');
    process.exit(1); 
  }

mongoose.connect(mongoString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cache('5 minutes'));
app.use(express.json())

app.use('/', movieRoutes)

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

export default server