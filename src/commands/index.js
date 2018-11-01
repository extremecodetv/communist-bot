const mongoose = require('mongoose')

const logger = require('./../util/logger')
const { bot } = require('../config')

const commands = require('require-all')({
  dirname: __dirname,
  filter: /(.+command)\.js$/,
  recursive: true
})

const log = logger(module)

const handleRepression = async (msg) => {
  const { Repression } = mongoose.models
  if (msg.new_chat_member) {
    const { id } = msg.new_chat_member
    const repression = await Repression.findOne({ telegram_id: id })
    if (!repression) {
      await bot.restrictChatMember(msg.chat.id, id, { until_date: -1, can_send_messages: false })
    }
  }
}

module.exports = async (msg) => {
  try {
    if (msg.chat.id === -1001121056081) {
      for (let command of Object.values(commands)) {
        await command(msg)
      }
    } else if (msg.chat.id === -1001406319553) {
      await handleRepression(msg)
    }
  } catch (e) {
    log.error(e)
  }
}
