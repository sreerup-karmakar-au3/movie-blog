import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/navbar'
import App from './components/app'
import AddMovie from './components/addmovie'

function MoviewBlog() {
    return (
        <Router>
            <NavBar/>
            <Route exact path="/" component={App}/>
            <Route exact path="/add" component={AddMovie}/>
        </Router>
    )
}

ReactDOM.render(<React.StrictMode><MoviewBlog/></React.StrictMode>, document.getElementById('root'));