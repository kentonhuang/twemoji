import React,{useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'
import LoginContainer from './LoginContainer'
import TweetBox from './TweetBox'

const TopContainer = () => {

  const { state } = useContext(AuthContext)

  return (
    <div className="top-container">
      {!state.isAuthenticated ? <LoginContainer /> : <TweetBox />}
    </div>
  )
}

export default TopContainer;
