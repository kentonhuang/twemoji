import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from '../component/Tweet'
import LoginContainer from '../component/LoginContainer'

import './Home.css'

const Home = () => {
  const url = 'http://localhost:3005/tweets'

  const [homeTweets, setHomeTweets] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setError(false)
      setLoading(true)

      try {
        const res = await axios.get(url)
        setHomeTweets(res.data)
        console.log(res.data)
      }catch(e) {
        setError(true)
      }
      setLoading(false)
    }
    getData()
  }, [])

  return (
    <div className="Home">
      <LoginContainer />
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="Tweets">
          {homeTweets.map((tweet) => <Tweet key={tweet._id} data={tweet}/>)}
        </div>
      )}
    </div>
  )
}
export default Home;
