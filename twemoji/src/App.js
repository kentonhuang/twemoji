import React from 'react';
import './App.css';

import Home from './home/Home'

import AuthContext from './context/AuthContext'

const user = localStorage.getItem("user")
const email = localStorage.getItem("email")
const token = localStorage.getItem("token")

console.log(user, email, token)

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

  console.log(state)

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className="App">
          <Home/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
