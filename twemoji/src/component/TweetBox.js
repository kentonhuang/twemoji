import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize';
import AuthContext from '../context/AuthContext'
import TweetContext from '../context/TweetsContext'
import "./TweetBox.css"
import TweetsContext from '../context/TweetsContext';

const TweetBox = () => {

  const {state, dispatch} = useContext(AuthContext)
  const {tweetDispatch} = useContext(TweetsContext)
  const [Error, setError] = useState(undefined) 
  const [tweetContent, setTweetContent] = useState('')

  
  const url = 'http://localhost:3005/users/logout'
  const url2 = 'http://localhost:3005/tweets'

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

  const sendTweet = async (e) => {
    e.preventDefault()
    const tweet = {
      'content': tweetContent
    }
    try {
      const res = await axios.post(url2, {
        content: tweetContent
      }, {
        headers: {Authorization: `Bearer ${state.token}`}
      })
      await tweetDispatch({
        type: 'ADD_NEW_TWEET',
        payload: res.data
      })
      setTweetContent('')
      return
    } catch (e) {
      console.log(e)
    }
    return 
  }

  const tweetChange = (event) => setTweetContent(event.target.value)

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
      <form onSubmit={sendTweet}>
        <TextareaAutosize onChange={tweetChange} value={tweetContent} className="textbox"/>
        <button type="submit">Tweet</button>
      </form>
    </div>
  )
}

export default TweetBox;
