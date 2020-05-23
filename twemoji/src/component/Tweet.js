import React from 'react'
import { Twemoji } from 'react-emoji-render'
import { useHistory } from 'react-router-dom'
import './Tweet.css'
import image from '../icon/Twitter_egg_avatar.png'

const Tweet = ({ data }) => {

  let history = useHistory()

  const handleClick = () => {
    history.push(`/profile/${data.user.username}`)
  }

  return (
    <div className="Tweet">
      <div onClick={handleClick} className="avatar"><img src={image} className="image" /></div>
      <div className="content">
        <div className="content-info">
          <div className="content-info-name">
          <span onClick={handleClick} className="display-name">{data.user.displayName}</span>
          <span onClick={handleClick} className="username">{'@' + data.user.username}</span>
          </div>
        </div>
        <div className="content-text">
          <Twemoji text={data.content}/>
        </div>
      </div>
    </div>
  )
}

export default Tweet;
