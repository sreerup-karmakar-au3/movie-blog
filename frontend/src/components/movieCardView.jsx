import React, { useEffect, useState } from 'react'

import MovieCards from './container/movieCards'

const axios = require('axios')

function MovieCardView() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('/fetchmovies')
        .then(res => setMovies(res.data))
        .catch(err => console.log(err));
    }, [])

    return (
        <div>
            {
                movies.length ? (
                    <MovieCards movieDetails={movies}/>
                ) : "Add Movies"
            }
        </div>
    )
}

export default MovieCardView;