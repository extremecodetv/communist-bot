const { bot, rules } = require('../config')

const command = '/rules'

module.exports = async (msg) => {
  const isCommand = ~msg.text.indexOf(command)

  if (isCommand) {
    await bot.sendMessage(msg.chat.id, rules)
  }
}
