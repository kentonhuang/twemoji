import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import axios from 'axios'
import './App.css';

import Home from './home/Home'
import Profile from './component/Profile'
import Navigation from './component/Navigation'

import AuthContext from './context/AuthContext'
import TweetContext from './context/TweetsContext'
import UsersContext from './context/UsersContext'
import FollowContext from './context/FollowContext';

const username = localStorage.getItem("username")
const email = localStorage.getItem("email")
const token = localStorage.getItem("token")
const _id = localStorage.getItem("_id")
const displayName = localStorage.getItem("displayName")

const following = {
  following: [],
  followers: [],
}

const followReducer = (state, action) => {
  switch(action.type) {
    case 'GET_FOLLOWING':
      return {
        ...state,
        following: action.payload.following
      }
    default:
      return state
  }
}

const initialUsers = {
  users: []
}

const usersReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload.users
      };
    default:
      return state
  }
}

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
  isAuthenticated: _id && username && email && token ? true : false,
  username: username || null,
  email: email || null,
  token: token || null,
  _id: _id || null,
  displayName: displayName || null,
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("_id", action.payload._id);
      localStorage.setItem("displayName", action.payload.displayName);
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        email: action.payload.email,
        token: action.payload.token,
        _id: action.payload._id,
        displayName: action.payload.displayName
      };
    case 'LOGOUT': 
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        email: null,
        token: null,
        _id: null,
        displayName: null
      };
    default:
      return state
  }
}

function App() {

  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [tweetState, tweetDispatch] = React.useReducer(tweetReducer, initialTweets)
  const [usersState, usersDispatch] = React.useReducer(usersReducer, initialUsers)
  const [followState, followDispatch] = React.useReducer(followReducer, following)

  const followURL = `http://localhost:3005/user/following/${state.username}`

  console.log(followState)

  useEffect(() => {
    const getFollow = async () => {
      try {
        const res = await axios.get(followURL, {
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        })
        console.log(res.data.follows[0].following)
        await followDispatch({
          type: 'GET_FOLLOWING',
          payload: {
            following: res.data.follows[0].following
          }
        })
      } catch(e) {
        console.log(e)
      }
    }
    if(state.isAuthenticated) {
      getFollow()
    }
  }, [])

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
        <UsersContext.Provider value ={{
          usersState,
          usersDispatch
        }}
        >
          <FollowContext.Provider value ={{
            followState,
            followDispatch
          }}
          >
            <div className="App">
              <Router>
                <Navigation auth={state}/>
                <Switch>
                  <Route path="/profile/:id">
                    <Profile/>
                  </Route>
                  <Route path="/">
                    <Home/>
                  </Route>
                </Switch>
              </Router>
            </div>
          </FollowContext.Provider>
        </UsersContext.Provider>
      </TweetContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
