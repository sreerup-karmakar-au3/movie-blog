import React from 'react'
import moment from 'moment/moment'

import '../styles/movieCards.css'

const axios = require('axios')

function MovieCards({ movieDetails }) {

    let deleteMovie = (id) => {
        console.log(id);
        axios.delete(`/removedetails/${id}`)
        .then(res => {
            console.log(res.data);
            window.location.reload(false);
        })
    }

    return (
        <div>
            {
                movieDetails.map(item => (
                    <div className="card border-light bg-light m-3" key={item._id}>
                        <div className="row no-gutters">
                            <div className="col-md-5">
                                <img src={item.image} className="card-img" alt={item.movie}/>
                            </div>
                            <div className="col-md-7">
                                <div className="card-body d-flex flex-column">
                                    <div className="movie-title">{item.movie}</div>
                                    <div className="d-flex justify-content-between">
                                        <div style={{fontSize: "12px"}}><span className="font-weight-bold">Genre:</span> {item.genre}</div>
                                        <div style={{fontSize: "12px"}}><span className="font-weight-bold">Released on:</span> {moment(moment(item.date, "YYYY-MM-DD")).format("DD MMMM, YYYY")} ({item.country})</div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div style={{fontSize: "12px"}}><span className="font-weight-bold">Language:</span> {item.language}</div>
                                        <div style={{fontSize: "12px"}}><span className="font-weight-bold">Duration:</span> {item.duration}</div>
                                    </div>
                                    <div style={{fontSize: "12px"}}><span className="font-weight-bold">Director:</span> {item.director}</div>
                                    <div style={{fontSize: "12px"}}><span className="font-weight-bold">Casts:</span> {item.cast}</div>
                                    <div style={{fontSize: "12px"}}><span className="font-weight-bold">Story:</span> {item.story}</div>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="btn btn-outline-danger btn-sm mt-1" onClick={() => deleteMovie(item._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MovieCards;