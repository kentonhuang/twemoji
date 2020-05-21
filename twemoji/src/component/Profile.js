import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import './Profile.css'

import TweetsContext from '../context/TweetsContext'
import UsersContext from '../context/UsersContext'
import FollowContext from '../context/FollowContext'
import AuthContext from '../context/AuthContext'

import TweetContainer from './TweetContainer'

import image from '../icon/Twitter_egg_avatar.png'

const Profile = () => {
  const {tweetState, tweetDispatch} = useContext(TweetsContext)
  const {usersState, usersDispatch} = useContext(UsersContext)
  const {followState, followDispatch} = useContext(FollowContext)
  const {state} = useContext(AuthContext)

  let { id } = useParams();

  const usersUrl = 'http://localhost:3005/users'
  const url = `http://localhost:3005/tweets?username=${id}`
  const followURL = `http://localhost:3005/following/${id}`
  const userFollowing = `http://localhost:3005/user/following/${state.username}`

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [error, setError] = useState(false)

// MOVE THIS TO ITS OWN FILE
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
  }, [id])

const handleFollow = async () => {
  try {
    const follow = await axios.post(followURL, null, {
      headers: { Authorization: `Bearer ${state.token}`}
    })
    const follows = await axios.get(userFollowing)
    await followDispatch({
      type: 'GET_FOLLOWING',
      payload: {
        following: follows.data.follows[0].following
      }
    })
  } catch(e) {
  }
}

const handleUnfollow = async () => {
  try {
    const follow = await axios.patch(followURL, null, {
      headers: { Authorization: `Bearer ${state.token}`}
    })
    const follows = await axios.get(userFollowing)
    await followDispatch({
      type: 'GET_FOLLOWING',
      payload: {
        following: follows.data.follows[0].following
      }
    })
  } catch(e) {
  }
}

const renderFollowButton = () => {
  if(user) {
    if(state._id === user._id) {
      return <button disabled>This is You!!!</button>
    }
    if(followState.following.find((ele) => ele.user_id === user._id)) {
      return <button onClick={handleUnfollow}>Following</button>
    } else {
      return <button onClick={handleFollow}>Follow</button>
    }
  }
}

renderFollowButton()

  return (
    <div className="profile">
      <div className="profile-header">
        <img src="https://i.imgur.com/zK6jlj1.jpg" alt="banner-pic"/>
      </div>
      <div className="profile-info">
        <img src={image} />
        <div className="profile-buttons-container">
          <div className="profile-buttons">
            {renderFollowButton()}
          </div>
        </div>
        <span className="profile-display">{user.displayName}</span> 
        <span className="profile-username">{'@' + user.username}</span>
        <span>{moment(user.createdAt).format('MMM YYYY')}</span>
        <div>
          <span>{} Following</span>
          <span>Followers</span>
        </div>
        <div></div>
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
