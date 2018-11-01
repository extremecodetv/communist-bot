const { bot } = require('../config')
const moment = require('moment')
const mongoose = require('mongoose')

const command = '/repression'

let admins = []

bot.getChatAdministrators('@extremecode_rest').then(result => {
  admins = result
})

const setRepression = async (user, until) => {
  const { Repression } = mongoose.models
  const siberia = -1001406319553
  let repression = await Repression.findOne({ telegram_id: user.id })
  const username = user.username ? user.username : 0

  await bot.restrictChatMember(siberia, user.id, { until_date: -1, can_send_messages: true, can_send_media_messages: true, can_add_web_page_previews: true })

  if (!repression) {
    return Repression.create({ telegram_id: user.id, username, until })
  }

  repression.until = until
  return repression.save()
}

module.exports = async (msg) => {
  const isCommand = ~msg.text.indexOf(command)
  const isAdmin = admins.find(a => a.user.id === msg.from.id)

  if (isCommand && isAdmin) {
    if (!msg.reply_to_message) {
      await bot.sendMessage(msg.chat.id, 'Товарищ! Для репрессии необходим ответ на сообщение неугодного капиталиста!')
    }

    const time = moment().add(1, 'days').format('X')
    const userId = msg.reply_to_message.from.id
    const username = msg.reply_to_message.from.username ? '@' + msg.reply_to_message.from.username : 'Безымянная'

    await bot.restrictChatMember(msg.chat.id, userId, { until_date: time, can_send_messages: false })
    await bot.sendMessage(msg.chat.id, `${username} капиталистическая мразь, вам выданы репрессии сроком 1 день, вы несможете писать сообщения в течении этого времени. Получите и распишитесь. Так же просим пройти в ЛАГЕРЬ для проведения исправительно-воспитательных работ @siberia_extremecode`)

    await setRepression(msg.reply_to_message.from, time)
  }
}
