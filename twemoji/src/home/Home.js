import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Tweet from '../component/Tweet'
import LoginContainer from '../component/LoginContainer'
import TweetsContext from '../context/TweetsContext';

import './Home.css'
import TopContainer from '../component/TopContainer';

const Home = () => {

  const url = 'http://localhost:3005/tweets'

  const {tweetState, tweetDispatch} = useContext(TweetsContext)

  const [homeTweets, setHomeTweets] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setError(false)
      setLoading(true)

      try {
        const res = await axios.get(url)
        const payload = {
          tweets: res.data
        }
        await tweetDispatch({
          type: 'GET_TWEETS',
          payload
        })
        return setLoading(false)
      }catch(e) {
        setError(true)
      }
    }
    getData()
  }, [])

  console.log(tweetState)

  return (
    <div className="Home">
      <TopContainer />
      {tweetState.tweets.length === 0 ? (
        <div>Loading</div>
      ) : (
        <div className="Tweets">
          {tweetState.tweets.map((tweet) => <Tweet key={tweet._id} data={tweet}/>)}
        </div>
      )}
    </div>
  )
}
export default Home;
