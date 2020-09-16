require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
}

const {
  DB_HOST,
  DB_NAME,
  DB_PORT,
} = process.env

const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

let dbConnect = () => {
  mongoose.connect(dbConnectionURL, options, (err) => {
    if (err) return console.log(err);
    console.log('DB connected');
  })
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
})

dbConnect()
