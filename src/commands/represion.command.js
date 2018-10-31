const { bot } = require('./../config')

const command = '/repression'

let admins = []

bot.getChatAdministrators('@extremecode_rest').then(result => {
  admins = result
})

module.exports = async (msg) => {
  const isCommand = ~msg.text.indexOf(command)
  const isAdmin = admins.find(a => a.user.id === msg.from.id)

  if (isCommand && isAdmin) {
    const mention = msg.entities.find(e => e.type === 'mention')
    if (!mention) {
      // TODO: User Required
    }

    const username = msg.text.substring(mention.offset, msg.text.length)
  }
}
