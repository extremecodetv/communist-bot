require('dotenv').config()

module.exports = {
  bot: require('./bot'),
  mongo: {
    uri: process.env.MONGO_URI
  }
}
