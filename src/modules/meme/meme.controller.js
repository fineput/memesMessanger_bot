const memeService = require('./meme.service');

async function handleCreateMeme(ctx, next){
    try {
        const photo = ctx.message.photo.at(-1).file_id;
        const caption = ctx.message.caption || '';

        const newMeme = await memeService.createMeme({
            authorId: ctx.dbUser._id,
            imageFileId: photo,
            caption: caption
        });

        console.log(`Meme created ✅ ID: ${newMeme._id}`);
        await ctx.reply('Мем додано до черги✅');
        return next();

    } catch (error) {
        console.error('Помилка при створенні мему:', error);
        await ctx.reply('Вибач, не вдалося зберегти мем.');
    }
}


module.exports = {handleCreateMeme};