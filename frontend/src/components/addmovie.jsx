import React, { useState } from 'react'

const axios = require('axios');

function AddMovie() {

    const [ details, setDetails] = useState({
        image: "",
        movie: "",
        genre: "Action",
        date: "",
        country: "",
        language: "",
        duration: "",
        director: "",
        cast: "",
        story: ""
    })
    const [errors, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [messages, setMessages] = useState([]);

    let handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/addDetails', details)
        .then(res => {
            setError(false);
            setMessages([]);
            setSuccess(true);
            setMessages([res.data]);
        })
        .catch(err => {
            setSuccess(false);
            setError(true);
            setMessages([]);
            (err.response.data.errors).forEach(element => {
                setMessages(messages => [...messages, element.msg]);
            });
        });
    }

    let categories = ["Action", "Adult", "Adventure", "Animation", "Biopic", "Comedy", "Crime", "Documentary", "Drama", "Spy", "Fantasy", "Historical", "Horror", "Mystery", "Romance", "Fiction", "Suspence/Thriller", "Western"];

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-md-6 offset-md-3">
                    <h2 style={{textAlign: "center"}}>Add Movie Details</h2>
                    <hr/>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        {
                            (errors && messages.length>0) ? (
                                <div className="alert alert-danger" role="alert">
                                    <ul>
                                        {
                                            messages.map((item, indx) => (
                                                <li key={indx}>{item}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ) : ""
                        }
                        {
                            success && (<div className="alert alert-success" role="alert">{messages}</div>)
                        }
                        <div className="form-group">
                            <label htmlFor="imagelink">Image link</label>
                            <input type="text" className="form-control form-control-sm" id="imagelink" placeholder="Enter link" onChange={(e) => setDetails({...details, image: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="moviename">Movie name</label>
                            <input type="text" className="form-control form-control-sm" id="moviename" placeholder="Enter movie title" onChange={(e) => setDetails({...details, movie: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Genre</label>
                            <select className="form-control form-control-sm" id="category" onChange={(e) => setDetails({...details, genre: e.target.value})}>
                                <option defaultValue disabled>Choose...</option>
                                {
                                    categories.map((item, indx) => (
                                        <option key={indx}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="releasedate">Release Date</label>
                                <input type="date" className="form-control form-control-sm" id="releasedate" onChange={(e) => setDetails({...details, date: e.target.value})}/>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="country">Country</label>
                                <input type="text" className="form-control form-control-sm" id="country" placeholder="Enter country" onChange={(e) => setDetails({...details, country: e.target.value})}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col form-group">
                                <label htmlFor="language">Language</label>
                                <input type="text" className="form-control form-control-sm" id="language" placeholder="Enter language/languages" onChange={(e) => setDetails({...details, language: e.target.value})}/>
                            </div>
                            <div className="col form-group">
                                <label htmlFor="runtime">Runtime</label>
                                <input type="text" className="form-control form-control-sm" id="runtime" placeholder="Enter duration in minutes" onChange={(e) => setDetails({...details, duration: e.target.value})}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="director">Director</label>
                            <input type="text" className="form-control form-control-sm" id="director" placeholder="Director name" onChange={(e) => setDetails({...details, director: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="casting">Cast</label>
                            <input type="text" className="form-control form-control-sm" id="casting" placeholder="Enter actor or actress names" onChange={(e) => setDetails({...details, cast: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="storyline">Storyline</label>
                            <textarea className="form-control" id="storyline" rows="5" onChange={(e) => setDetails({...details, story: e.target.value})}></textarea>
                        </div>
                        <button type="submit" className="btn btn-secondary btn-sm btn-block">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMovie;