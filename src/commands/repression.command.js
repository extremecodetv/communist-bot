const { bot } = require('../config')
const moment = require('moment')

const command = '/repression'

let admins = []

bot.getChatAdministrators('@extremecode_rest').then(result => {
  admins = result
})

module.exports = async (msg) => {
  const isCommand = ~msg.text.indexOf(command)
  const isAdmin = admins.find(a => a.user.id === msg.from.id)

  if (isCommand && isAdmin) {
    if (!msg.reply_to_message) {
      await bot.sendMessage(msg.chat.id, 'Товарищ! Для репрессии необходим ответ на сообщение неугодного капиталиста!')
    }

    const time = moment().add(7, 'days').format('X')
    const userId = msg.reply_to_message.from.id
    const username = msg.reply_to_message.from.username ? '@' + msg.reply_to_message.from.username : 'Безымянная'

    await bot.restrictChatMember(msg.chat.id, userId, { until_date: time, can_send_messages: false })
    await bot.sendMessage(msg.chat.id, `${username} капиталистическая мразь, вам выданы репрессии сроком 7 дней, вы несможете писать сообщения в течении этого времени. Получите и распишитесь. Так же просим пройти в ЛАГЕРЬ для проведения исправительно-воспитательных работ @siberia_extremecode`)
  }
}
