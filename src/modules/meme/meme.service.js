const Meme = require('../../models/Meme');

async function createMeme(data){
    return await Meme.create(data)
}

module.exports = {createMeme}