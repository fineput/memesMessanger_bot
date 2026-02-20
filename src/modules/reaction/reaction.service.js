const Reaction = require('../../models/Reaction');
const Meme = require('../../models/Meme');

async function addReaction(memeId, userId, type) {
    const existingReaction = await Reaction.findOne({userId, memeId});
    if(existingReaction) return null;

    const reaction = await Reaction.create({memeId, userId, type});

    const updateField = type === 'like' ? 'likesCount' : 'dislikesCount';
    const updateMeme = await Meme.findByIdAndUpdate(
        memeId,
        { $inc: {[updateField]: 1}},
        {returnDocument: 'after'}
    );

    return updateMeme;
}

module.exports = { addReaction }