const logger = require('./../util/logger')
const mongoose = require('mongoose')
const commands = require('require-all')({
  dirname: __dirname,
  filter: /(.+command)\.js$/,
  recursive: true
})

const log = logger(module)

const handleUser = async (from) => {
  const { User } = mongoose.models
  const user = await User.findOne({
    telegram_id: from.id
  })

  if (!user) {
    return User.create({
      telegram_id: from.id,
      username: from.username
    })
  }

  if (user.username !== from.username) {
    user.username = from.username
    return user.save()
  }
}

module.exports = async (msg) => {
  try {
    await handleUser(msg.from)

    for (let command of Object.values(commands)) {
      await command(msg)
    }
  } catch (e) {
    log.error(e)
  }
}
