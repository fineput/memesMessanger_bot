const feedService = require('./feed.service');
const Viewed = require('../../models/Viewed');

async function handleShowFeed(ctx, next) {
    try {
        const meme = await feedService.getNextMemeForUser(ctx.dbUser._id);

        if(!meme) {
            return ctx.reply('На сьогодні меми закінчилися! Спробуй пізніше або додай свій 📺')
        }

        if(ctx.callbackQuery){
            try {
                await ctx.deleteMessage();
            } catch (error) {
                
            }
        }

        await ctx.replyWithPhoto(meme.imageFileId, {
            caption: meme.caption || '',
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: `👍 ${meme.likesCount}`, callback_data: `like_${meme._id}`},
                        {text: `👎 ${meme.dislikesCount}`, callback_data: `dislike_${meme._id}`}
                    ],
                    [{text: 'Наступний ➡️', callback_data: 'next_meme' }]
                ]
            }
        });

        await Viewed.create({
            userId: ctx.dbUser._id,
            memeId: meme._id
        });

        if(ctx.callbackQuery) await ctx.answerCbQuery();
        return next();
    } catch (error) {
        console.log('Feed error:', error);
        ctx.reply('Сталася помилка при завантаженні стрічки 😵‍💫');
    }
}

module.exports = {handleShowFeed};