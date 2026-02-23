const feedService = require('./feed.service');
const Viewed = require('../../models/Viewed');

async function handleShowFeed(ctx, next) {
    try {
        if (!ctx.session) ctx.session = {};
        if (!ctx.callbackQuery && ctx.message) {
            await ctx.deleteMessage(ctx.message.message_id).catch(() => {});
        }
        const meme = await feedService.getNextMemeForUser(ctx.dbUser._id);

        if(!meme) {
            if(ctx.session?.lastMsgId){
                await ctx.deleteMessage(ctx.session.lastMsgId).catch(() => {});
            }
            if (ctx.callbackQuery) {
                await ctx.deleteMessage().catch(() => {});
            }
            const sentMsg = await ctx.reply('На сьогодні меми закінчилися! Спробуй пізніше або додай свій 📺');
            ctx.session.lastMsgId = sentMsg.message_id;
            if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
            return;
        }

        if(ctx.callbackQuery){
            await ctx.deleteMessage().catch(() => {});
        } else {
            await ctx.deleteMessage().catch(() => {});

            if(ctx.session?.lastMsgId){
                await ctx.deleteMessage(ctx.session.lastMsgId).catch(() => {});
                ctx.session.lastMsgId = null;
            }
        }

        const sentMsg = await ctx.replyWithPhoto(meme.imageFileId, {
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

        ctx.session.lastMsgId = sentMsg.message_id;

        try {
            await Viewed.create({
                userId: ctx.dbUser._id,
                memeId: meme._id
            });
        } catch (error) {
            if(error.code !== 11000) console.error('View log error:', error);
        }

        if(ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
        if(next) return next();

    } catch (error) {
        console.log('Feed error:', error);
        const sentMsg = await ctx.reply('Сталася помилка при завантаженні стрічки 😵‍💫');
        if(sentMsg) ctx.session.lastMsgId = sentMsg.message_id;
    }
}

module.exports = {handleShowFeed};