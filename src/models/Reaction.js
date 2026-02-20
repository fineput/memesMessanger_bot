const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    memeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Meme'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: {type: [String], enum: ['like', 'dislike']}
});

reactionSchema.index({memeId: 1, userId: 1}, {unique: true});

module.exports = mongoose.model('Reaction', reactionSchema);