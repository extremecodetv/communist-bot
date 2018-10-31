const mongoose = require('mongoose')
const config = require('./../config')

mongoose.Promise = global.Promise

mongoose.connect(config.mongo.uri, {
  auto_reconnect: true,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0,
  useNewUrlParser: true
})

/**
 * cachegoose(mongoose, {
 *   prefix: 'cache',
 *   engine: 'redis',
 *   host: config.redis.host,
 *   port: config.redis.port
 * })
*/

module.exports = {
  User: require('./user')
}
