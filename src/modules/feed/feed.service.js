const Meme = require('../../models/Meme');
const Viewed = require('../../models/Viewed');

async function getNextMemeForUser(userId) {
    const viewedMemes = await Viewed.find({userId}).distinct('memeId');

    const meme = await Meme.findOne({
        _id: {$nin: viewedMemes}
    })

    return meme;
}

module.exports = {getNextMemeForUser};