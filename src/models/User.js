const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: {type: Number, unique: true},
    username: String,
    reputation: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);