import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Tweet from '../component/Tweet'
import LoginContainer from '../component/LoginContainer'
import TweetsContext from '../context/TweetsContext';
import AuthContext from '../context/AuthContext';
import UsersContext from '../context/UsersContext'

import Navbar from '../component/Navbar';

import './Home.css'
import TopContainer from '../component/TopContainer';
import TweetContainer from '../component/TweetContainer';

const Home = () => {

  const url = 'http://localhost:3005/tweets'
  const usersUrl = 'http://localhost:3005/users'

  const {tweetState, tweetDispatch} = useContext(TweetsContext)
  const {usersState, usersDispatch} = useContext(UsersContext)
  const {state, dispatch} = useContext(AuthContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [viewTweet, setViewTweet] = useState(0)
  const [navElements, setNavElements] = useState([{
    name: 'All',
    style: {
      borderBottom: '3px solid blue'
    },
  }, {
    name: 'Following',
    style: {
      borderBottom: '1px solid #333333'
    }
  }])

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

  const setViewState = (activeTab, index) => {
    navElements[viewTweet].style = {borderBottom: '1px solid #cccccc'}
    setViewTweet(index)
    navElements[index].style = {borderBottom: '3px solid blue'}
  }

  return (
    <div className="Home">
      <TopContainer />
      <Navbar elements={navElements} callback={setViewState}/>
      {loading ? (
        <div>Loading</div>
      ) : (
        <TweetContainer tweets={tweetState.tweets} userList={usersState.users} auth={state}/>
      )}
    </div>
  )
}
export default Home;
