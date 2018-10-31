const { bot } = require('../config')

const command = '/github'

module.exports = async (msg) => {
  const isCommand = ~msg.text.indexOf(command)

  if (isCommand) {
    await bot.sendMessage(msg.chat.id, 'Разработка бота ведется здесь: \r\nhttps://github.com/extremecodetv/communist-bot')
  }
}
