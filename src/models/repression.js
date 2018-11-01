const mongoose = require('mongoose')

const model = mongoose.Schema({
  telegram_id: { type: Number, required: true },
  username: { type: String, required: true },
  until: { type: Date, required: true }
})

module.exports = mongoose.model('Repression', model)
