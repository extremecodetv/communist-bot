const { bot } = require('../config')

const command = '/abuse'

module.exports = async (msg) => {
  const isCommand = ~msg.text.indexOf(command)

  if (isCommand) {
    await bot.sendMessage(msg.chat.id, 'Анонимную докладную можно оставить здесь: \r\nhttps://donos-extremecode.herokuapp.com/')
  }
}
