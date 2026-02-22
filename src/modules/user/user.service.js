const Meme = require('../../models/Meme');
const User = require('../../models/User');

async function viewMemes(userId) {
    const memeCounter = await Meme.countDocuments({authorId: userId});
    return memeCounter;
}

async function userReputation(userId) {
    const memes = await Meme.find({authorId: userId});

    if(!memes.length) return 0;

    const totalLikes = memes.reduce((sum, meme) => sum + (meme.likesCount || 0), 0);
    const totalDislikes = memes.reduce((sum, meme) => sum + (meme.dislikesCount || 0), 0);

    const reputationFromLikes = Math.floor(totalLikes / 3);
    const reputationFromDislikes = Math.floor(totalDislikes / 3);

    const finalReputation = reputationFromLikes - reputationFromDislikes;
    return finalReputation;
}

async function getMyMemeByPage(userId, index){
    const memes = await Meme.find({authorId: userId})
        .sort({createdAt: -1})
        .skip(index)
        .limit(1)

    return memes[0];
}

module.exports = { viewMemes, userReputation, getMyMemeByPage };