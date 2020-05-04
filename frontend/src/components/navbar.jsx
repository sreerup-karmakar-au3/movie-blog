import React from 'react'
import { Link } from 'react-router-dom'

import './styles/navbar.css'

function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">
                <img src="https://images.vexels.com/media/users/3/135574/isolated/preview/6bb2fa38400c23af6c28bdc905bab2b5-camcorder-round-icon-by-vexels.png" width="30" height="30" className="d-inline-block align-top" alt="icon"/>
                Movie Blog
            </Link>
        </nav>
    )
}

export default NavBar;