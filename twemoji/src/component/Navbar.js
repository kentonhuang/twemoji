import React from 'react'

import './NavBar.css'

const Navbar = ({elements, callback}) => {

  const navbarCallback = (ele, index) => {
    callback(ele, index)
  }


  const mapElements = () => {
    return elements.map((ele, index) => {
      return (
        <div key={index} style={ele.style} onClick={() => navbarCallback(ele, index)} className="navbar-button">{ele.name}</div>
      )
    })
  }

  return (
    <nav className="navbar">
      {mapElements()}
    </nav>
  )
}

export default Navbar;
