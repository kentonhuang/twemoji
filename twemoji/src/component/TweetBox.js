import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import AuthContext from '../context/AuthContext'
import "./TweetBox.css"
import TweetsContext from '../context/TweetsContext';
import smileyFace from '../icon/icons8-smiling-100.png'

const TweetBox = () => {

  const {state, dispatch} = useContext(AuthContext)
  const {tweetDispatch} = useContext(TweetsContext)
  const [Error, setError] = useState(undefined) 
  const [tweetContent, setTweetContent] = useState('')
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [toggleKeyboard, setKeyboard] = useState(false) 

  
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
      console.log(res.data)
      const payload = {
        ...res.data,
      }
      const user = {
        ...state
      } 
      console.log(user)
      console.log(state)
      console.log(payload)
      await tweetDispatch({
        type: 'ADD_NEW_TWEET',
        payload,
        }
      )
      setTweetContent('')
      return
    } catch (e) {
      console.log(e)
    }
    return 
  }

  const tweetChange = (event) => {
    console.log(tweetContent)
    setTweetContent(event.target.value)
  }

  const selectEmoji = (emoji) => {
    let text = tweetContent
    text = text + emoji.native
    setTweetContent(text)
  }

  const handleKeyboardClick = (e) => {
    setKeyboard(!toggleKeyboard)
  }

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
      <form class="form" onSubmit={sendTweet}>
        <TextareaAutosize onChange={tweetChange} value={tweetContent} className="textbox"/>
        <div class="tweet-controls">
          <button class="tweet-button" type="submit">Tweet</button>
          <div class="tweet-keyboard">
            <img onClick={handleKeyboardClick}class="emoji-keyboard" src={smileyFace} alt="Emoji Logo" />
            {toggleKeyboard ? <Picker style={{position: 'absolute', top: '30px', left: '5px'}} onSelect={selectEmoji} set='twitter'/> : null}
          </div>
        </div>
      </form>
      
    </div>
  )
}

export default TweetBox;
