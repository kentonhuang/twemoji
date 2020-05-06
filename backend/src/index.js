const express = require('express');
require('./db/mongoose')
const cors = require('cors')
const userRouter = require('./routers/user')
const tweetRouter = require('./routers/tweet')

const app = express()
const port = process.env.PORT || 3005

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(tweetRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})