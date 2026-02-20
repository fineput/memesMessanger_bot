// const memeService = require('./meme.service');

// async function handleCrateMeme(ctx, next){
//     const photo = ctx.message.photo.at(-1).file_id;
//     const caption = ctx.message.caption || '';

//     await memeService.createMeme({
//         autherId: ctx.dbUSer._id,
//         imageFileId: photo,
//         caption
//     });

//     console.log('Meme created ✅');
//     await ctx.reply('Мем додано ✅');
//     return next();
// }

// module.exports = {handleCrateMeme};