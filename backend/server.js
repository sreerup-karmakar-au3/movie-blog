const express = require('express')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')

const MovieDetails = require('./models/moviedetailsModel')

const app = express();

const connection = mongoose.connection;
const URI = 'mongodb+srv://movieblog:movie@cluster0-af6mb.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true  })
connection.once('open', () => {
    console.log("MongoDB database connection established");
})

app.use(express.json());

app.get('/fetchmovies', (req, res) => {
    MovieDetails.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json("Error:", err));
})

//custom date validation
function isValidDate(value) {
    if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
  
    const date = new Date(value);
    if (!date.getTime()) return false;
    return date.toISOString().slice(0, 10) === value;
}

//custom movie name validation
function isAlphaNumericSpace(value) {
    if(!value.match(/^[a-zA-Z0-9. ]*$/)) return false;
    return value;
}

//custom movie language and cast validation
function isAlphaComma(value) {
    if(!value.match(/^[a-zA-Z, ]*$/)) return false;
    return value;
}

app.post('/addDetails', [
    check('image')
    .not().isEmpty().withMessage("Image link required")
    .trim().isURL().withMessage("Invalid image URL"),

    check('movie')
    .not().isEmpty().withMessage("Movie name required")
    .trim().custom(isAlphaNumericSpace).withMessage("Movie name can only have alphabets or numbers"),

    check('genre')
    .not().isEmpty().withMessage("Genre required")
    .trim().isAlpha().withMessage("Genre can have only alphabets"),

    check('date')
    .trim().custom(isValidDate).withMessage('Invalid date'),

    check('country')
    .not().isEmpty().withMessage("Country name required")
    .trim().custom(isAlphaComma).withMessage("Country name can have only alphabets"),
    
    check('language')
    .not().isEmpty().withMessage("Movie language required")
    .trim().custom(isAlphaComma).withMessage("Invalid language"),

    check('duration')
    .not().isEmpty().withMessage("Running time required")
    .trim().isInt().withMessage("Invalid time"),

    check('director')
    .not().isEmpty().withMessage("Director name required")
    .trim().custom(isAlphaComma).withMessage("Director name invalid"),

    check('cast')
    .not().isEmpty().withMessage("Movie casts required")
    .trim().custom(isAlphaComma).withMessage("Invalid names"),

    check('story')
    .trim().not().isEmpty().withMessage("Description required")
],(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json(errors);
    }

    const image = (req.body.image).trim();
    const movie = (req.body.movie).trim();
    const genre = (req.body.genre).trim();
    const date = Date.parse(req.body.date);
    const country = (req.body.country).trim();
    const language = (req.body.language).trim();
    const duration = Number(req.body.duration);
    const director = (req.body.director).trim();
    const cast = (req.body.cast).trim();
    const story = (req.body.story).trim();
    
    const newMovie = new MovieDetails({ image, movie, genre, date, country, language, duration, director, cast, story });

    newMovie.save()
    .then(() => res.json("Successfully added"))
    .catch(err => res.status(400).json("Error:", err));
})

app.delete('/removedetails/:id', (req, res) => {
    MovieDetails.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie deleted'))
    .catch(err => res.status(400).json('Error:', err));
})

app.listen(5000);