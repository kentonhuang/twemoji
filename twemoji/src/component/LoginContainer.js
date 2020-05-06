import React, {useContext} from 'react'
import "./LoginContainer.css"
import Login from './Login'
import TweetBox from './TweetBox'
import AuthContext from '../context/AuthContext'

const LoginContainer = () => {

  const { state } = useContext(AuthContext)

  return (
    <div className="login-container">
      {!state.isAuthenticated ? <Login /> : <TweetBox />}
    </div>
  )
}

export default LoginContainer;
