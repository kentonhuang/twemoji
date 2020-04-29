const express = require('express');

const app = express()
const port = process.env.PORT || 3005

app.use(express.json())

app.get('', (req, res) => {
  res.send('hey')
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})