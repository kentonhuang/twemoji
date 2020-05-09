import React from 'react'
import './Tweet.css'
import image from '../icon/Twitter_egg_avatar.png'

const Tweet = ({ data }) => {
  return (
    <div className="Tweet">
      <div className="avatar"><img src={image} className="image" /></div>
      <div className="content">
        <div className="content-info">
          <span className="display-name">{data.user.displayName}</span>
          <span className="username">{'@' + data.user.username}</span>
        </div>
        <div className="content-text">
          {data.content}
        </div>
      </div>
    </div>
  )
}

export default Tweet;
