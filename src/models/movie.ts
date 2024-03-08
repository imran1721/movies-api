import mongoose, { Schema } from 'mongoose';

const movieSchema = new Schema({
  title: String,
  director: String,
  genre: [String],
  rating: Number,
  streamingLink: String,
  year: Number,
})

export default mongoose.model('Movies', movieSchema);