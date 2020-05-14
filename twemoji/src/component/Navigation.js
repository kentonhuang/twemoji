import React from 'react'
import { Link } from 'react-router-dom'
import "./Navigation.css"

const Navigation = ({auth}) => {

  console.log(auth.isAuthenticated)
  return (
    <div className="nav-container">
      <div><Link to="/">Home</Link></div>
      {auth.isAuthenticated ? <div><Link to={`/profile/${auth.username}`}>Profile</Link></div> : undefined}
    </div>
  )
}

export default Navigation;
