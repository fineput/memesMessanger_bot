const mongoose = require('mongoose');

const viewedSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    memeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Meme'}
})

viewedSchema.index({userId: 1, memeId: 1}, {inique: true});

module.exports = mongoose.model('Viewed', viewedSchema);