const Meme = require('../../models/Meme');

async function createMeme(data){
    return await Meme.create(data)
}

async function deleteMeme(memeId, userId){
    const meme = await Meme.findOne({_id: memeId, authorId: userId});

    if (!meme) {
        throw new Error('Мем не знайдено або у вас немає прав на його видалення');
    }

    return await Meme.deleteOne({_id: memeId });
}


module.exports = {createMeme, deleteMeme}