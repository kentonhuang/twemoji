import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Tweet from '../component/Tweet'
import LoginContainer from '../component/LoginContainer'
import TweetsContext from '../context/TweetsContext';
import AuthContext from '../context/AuthContext';
import UsersContext from '../context/UsersContext'

import './Home.css'
import TopContainer from '../component/TopContainer';

const Home = () => {

  const url = 'http://localhost:3005/tweets'
  const usersUrl = 'http://localhost:3005/users'

  const {tweetState, tweetDispatch} = useContext(TweetsContext)
  const {usersState, usersDispatch} = useContext(UsersContext)
  const {state, dispatch} = useContext(AuthContext)

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
        const userIds = res.data.map((tweet) => {
          return tweet.owner
        }).filter((id, index, self) => {
          return self.indexOf(id) === index
        })

        const userList = await axios.get(usersUrl, {
          params: {
            ids: userIds
          }
        })

        await usersDispatch({
          type: 'GET_USERS',
          payload: {
            users: userList.data
          }
        })
        return setLoading(false)
      }catch(e) {
        setError(true)
      }
    }
    getData()
  }, [])

  const mapTweets = () => {

    if(loading) {
      return
    }
    return tweetState.tweets.map((tweet) => {
      const owner = tweet.owner
      const index = usersState.users.findIndex(obj => obj._id === owner)
      tweet.user = usersState.users[index]
      if(!tweet.user) {
        tweet.user = state
      }
      return <Tweet key={tweet._id} data={tweet}/>
    })
  }

  return (
    <div className="Home">
      <TopContainer />
      {tweetState.tweets.length === 0 ? (
        <div>Loading</div>
      ) : (
        <div className="Tweets">
          {mapTweets()}
        </div>
      )}
    </div>
  )
}
export default Home;
