import React from 'react'
import { Link } from 'react-router-dom'

import MovieCardView from './movieCardView'

function App() {
    return (
        <div className="container mt-2">
            <div className="row">
                <Link to="/add" className="btn btn-secondary btn-block">ADD MOVIE</Link>
            </div>
            <div className="row d-flex justify-content-center">
                <MovieCardView/>
            </div>
        </div>
    )
}

export default App;