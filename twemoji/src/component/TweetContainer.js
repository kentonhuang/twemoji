import React from 'react'
import Tweet from './Tweet'

const TweetContainer = ({tweets, userList, auth}) => {
  
  console.log(userList)

  const mapTweets = () => {

    return tweets.map((tweet) => {
      const owner = tweet.owner
      const index = userList.findIndex(obj => obj._id === owner)
      tweet.user = userList[index]
      if(!tweet.user) {
        tweet.user = auth
      }
      return <Tweet key={tweet._id} data={tweet}/>
    })
  }

  return (
    <div className="Tweets">
      {mapTweets()}
    </div>
  )
}

export default TweetContainer;
