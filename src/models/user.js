const mongoose = require('mongoose')

const model = mongoose.Schema({
  telegram_id: { type: Number, required: true },
  username: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', model)
