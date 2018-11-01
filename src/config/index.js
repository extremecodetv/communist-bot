const FileStream = require("fs")
require('dotenv').config()

module.exports = {
  bot: require('./bot'),
  mongo: {
    uri: process.env.MONGO_URI
  },
  rules: FileStream.readFileSync(`${__dirname}/../data/rules.txt`, 'utf8')
}
