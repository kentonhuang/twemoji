import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

const TweetBox = () => {

  const {state, dispatch} = useContext(AuthContext)
  const [Error, setError] = useState(undefined) 
  
  const url = 'http://localhost:3005/users/logout'

  const handleClick = async () => {
    try {
      const res = await axios.post(url, null, {
        headers: {Authorization: `Bearer ${state.token}`}
      })
      await dispatch({
        type: 'LOGOUT',
      })
      return 
    } catch (e) {
      setError(e)
    }
    return
  }

  return (
    <div>
      You are logged in
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}

export default TweetBox;
