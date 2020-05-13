import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Profile.css'

import TweetsContext from '../context/TweetsContext'
import UsersContext from '../context/UsersContext'

import TweetContainer from './TweetContainer'

import image from '../icon/Twitter_egg_avatar.png'

const Profile = () => {
  const {tweetState, tweetDispatch} = useContext(TweetsContext)
  const {usersState, usersDispatch} = useContext(UsersContext)

  let { id } = useParams();

  const usersUrl = 'http://localhost:3005/users'
  const url = `http://localhost:3005/tweets?username=${id}`

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(usersUrl + '/' + id)
        setUser(res.data)
      } catch (e) {
        console.log(e)
      }
    }
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
    getUser()
  }, [])

  console.log(user)

  return (
    <div className="profile">
      <div className="profile-header">
        <img src="https://i.imgur.com/zK6jlj1.jpg" alt="banner-pic"/>
      </div>
      <div className="profile-info">
        <img src={image} />
        <div className="profile-buttons-container">
          <div className="profile-buttons">
            <button>Follow</button>
          </div>
        </div>
        <span className="profile-display">{user.displayName}</span> 
        <span className="profile-username">{'@' + user.username}</span>
      </div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <TweetContainer tweets={tweetState.tweets} userList={usersState.users}/>
      )}
    </div>
  )
}

export default Profile;
