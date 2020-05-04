const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const detailsSchema = new Schema(
    {
        image: { type: String, trim: true, required: true },
        movie: { type: String, trim: true, required: true },
        genre: { type: String, trim: true, required: true },
        date: { type: Date, trim: true, required: true },
        country: { type: String, trim: true, required: true },
        language: { type: String, trim: true, required: true },
        duration: { type: Number, trim: true, required: true },
        director: { type: String, trim: true, required: true },
        cast: { type: String, trim: true, required: true },
        story: { type: String, trim: true, required: true }
    },
    {
        timestamps: false
    }
);

const MovieDetails = mongoose.model('Details', detailsSchema);

module.exports = MovieDetails;