import React from 'react';
import './App.css';

import Home from './home/Home'

import AuthContext from './context/AuthContext'
import TweetContext from './context/TweetsContext'
import Tweet from './component/Tweet';

const user = localStorage.getItem("user")
const email = localStorage.getItem("email")
const token = localStorage.getItem("token")

const initialTweets = {
  tweets: [],
}

const tweetReducer = (state, action) => {
  switch(action.type) {
    case 'GET_TWEETS':
      return {
        ...state,
        tweets: action.payload.tweets
      };
    case 'ADD_NEW_TWEET':
      state.tweets.unshift(action.payload)
      return {
        ...state,
        tweets: state.tweets
      }
    default:
      return state
  }
}

const initialState = {
  isAuthenticated: user && email && token ? true : false,
  user: user || null,
  email: email || null,
  token: token || null,
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      localStorage.setItem("user", action.payload.user);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        email: action.payload.email,
        token: action.payload.token
      };
    case 'LOGOUT': 
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        email: null,
        token: null,
      };
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [tweetState, tweetDispatch] = React.useReducer(tweetReducer, initialTweets)

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <TweetContext.Provider value={{
        tweetState,
        tweetDispatch
      }}>
        <div className="App">
            <Home/>
        </div>
      </TweetContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
