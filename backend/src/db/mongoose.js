const mongoose = require('mongoose')

try {
  mongoose.connect('mongodb://127.0.0.1:27017/twemoji-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
} catch (e) {
  console.log(e.message)
}

