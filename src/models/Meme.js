const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    imageFileId: String,
    caption: String,
    likesCount: {type: Number, default: 0},
    dislikesCount: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Meme', memeSchema);