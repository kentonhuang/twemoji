import React from 'react'
import './Tweet.css'
import image from '../icon/Twitter_egg_avatar.png'

const Tweet = ({ data }) => {
  return (
    <div className="Tweet">
      <div className="avatar"><img src={image} className="image" /></div>
      <div className="content">{data.content}</div>
    </div>
  )
}

export default Tweet;
