import React, {useState} from 'react'
import "./LoginContainer.css"
import Login from './Login'
import Register from './Register'

const LoginContainer = () => {

  const [loginToggle, setLoginToggle] = useState(true)

  const toggleLogin = () => {
    console.log('hey')
    setLoginToggle(!loginToggle)
  }

  return (
    <div className="login-container">
      {loginToggle ? <Login toggle={toggleLogin}/> : <Register toggle={toggleLogin}/>}
    </div>
  )
}

export default LoginContainer;
