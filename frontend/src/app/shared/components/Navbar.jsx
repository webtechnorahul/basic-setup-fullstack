import React from 'react'
import {FaRegHeart} from 'react-icons/fa'
import "../styles/Navbar.css"

// Renders the shared Instagram feed header.
const Navbar = () => {
  return (
        <div className="feed-header">
                <h2 className="feed-title">Instagram</h2>
                <FaRegHeart />
        </div>
  )
}

export default Navbar