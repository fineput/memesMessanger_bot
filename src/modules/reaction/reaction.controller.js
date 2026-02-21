const reactionService = require('./reaction.service');

async function handleReaction(ctx) {
    const callbackData = ctx.callbackQuery.data;
    const [type, memeId] = callbackData.split('_');

    const updateMeme = await reactionService.addReaction(memeId, ctx.dbUser._id, type);

    if(!updateMeme) {
        return ctx.answerCbQuery('Ти вже проголосував за цей мем! 😉');
    }

    await ctx.editMessageReplyMarkup({
        inline_keyboard: [
            [
                {text: `👍 ${updateMeme.likesCount}`, callback_data: `like_${memeId}`},
                {text: `👎 ${updateMeme.dislikesCount}`, callback_data: `dislike_${memeId}`},
            ],
            [{text: 'Наступний ➡️', callback_data: 'next_meme' }]
        ]
    });
    
    await ctx.answerCbQuery(type === 'like' ? 'Тобі сподобалось! ❤️' : 'Ну, буває... 💩');
}


module.exports = { handleReaction };