const Meme = require('../../models/Meme');
const User = require('../../models/User');

async function viewMemes(userId) {
    const memeCounter = await Meme.countDocuments({authorId: userId});
    return memeCounter;
}

async function userReputation(userId) {
    const user = await User.findOne(userId);
    return user ? user.reputation : 0;
}

async function getMyMemeByPage(userId, index){
    const memes = await Meme.find({authorId: userId})
        .sort({createdAt: -1})
        .skip(index)
        .limit(1)

    return memes[0];
}

module.exports = { viewMemes, userReputation, getMyMemeByPage };