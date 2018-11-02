const { bot } = require('../config')
const FileStream = require('fs')

const command = '/rules'
const setCommand = '/set_rules'

let admins = []

bot.getChatAdministrators('@efefewfwevf').then(result => {
  admins = result
})


module.exports = async (msg) => {
  const isCommand = ~msg.text.indexOf(command)
  const isSetCommand = ~msg.text.indexOf(setCommand)
  const isAdmin = admins.find(a => a.user.id === msg.from.id)

  if (isCommand) {
    FileStream.readFile(`${__dirname}/../data/rules.txt`, 'utf8', async (error, rules) => {
      if (error) throw error;
      await bot.sendMessage(msg.chat.id, rules)
    })
  }
  else if (isSetCommand && isAdmin) {
    if (!msg.reply_to_message) {
      return await bot.sendMessage(msg.chat.id, 'Товарищ! Необходимо выбрать запись для закрепления в качестве правил чата!')
    }

    FileStream.writeFile(`${__dirname}/../data/rules.txt`, msg.reply_to_message.text, 'utf8', async (error) => {
      if (error) {
        await bot.sendMessage(msg.chat.id, 'Произошла ошибка, не удалось установить новые правила')
        throw error;
      }
    })
  }
}
