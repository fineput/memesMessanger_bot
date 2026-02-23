const memeService = require('./meme.service');
const userService = require('../user/user.service');
const { handleUser } = require('../user/user.controller');

async function handleAddMemeRequest(ctx) {
    try {
        await ctx.deleteMessage().catch(() => {});
        
        if(ctx.session?.lastMsgId){
            await ctx.deleteMessage(ctx.session.lastMsgId).catch(() => {});
        }

        const sentMsg = await ctx.reply('Надішліть мені фото майбутнього мему 🖼', {
            reply_markup: {
                inline_keyboard: [[{text: '❌ Скасувати', callback_data: 'open_profile'}]]
            }
        })

        ctx.session.lastMsgId = sentMsg.message_id;
    } catch (error) {
        console.error(error);
    }
}

async function handleCreateMeme(ctx){
    if(!ctx.message.photo) return;
    if (!ctx.session) ctx.session = {};

    try {
        const photo = ctx.message.photo.at(-1).file_id;
        const caption = ctx.message.caption || '';

        await ctx.deleteMessage().catch(() => {});
        
        if(ctx.session?.lastMsgId){
            await ctx.deleteMessage(ctx.session.lastMsgId).catch(() => {});
        }

        await memeService.createMeme({
            authorId: ctx.dbUser._id,
            imageFileId: photo,
            caption: caption
        });

        const sentMsg = await ctx.reply('Мем додано до черги ✅');

        ctx.session.lastMsgId = sentMsg.message_id;
    } catch (error) {
        console.error('Помилка при створенні мему:', error);
        await ctx.reply('Вибач, не вдалося зберегти мем.');
    }
}


async function handleDeleteMeme(ctx) {
    try {
        if (!ctx.session) ctx.session = {};
        const memeId = ctx.callbackQuery.data.split('_')[1];
        const userId = ctx.dbUser._id;

        await memeService.deleteMeme(memeId, userId);

        await ctx.answerCbQuery('Мем видалено назавжди 🗑')
        return handleManagerMemes(ctx);
    } catch (error) {
        console.error('Delete error: ', error);
        await ctx.answerCbQuery('Помилка: не вдалося видалити мем')
    }

}

async function handleManagerMemes(ctx) {
    try {
        if (!ctx.session) ctx.session = {};
        const data = ctx.callbackQuery.data || '';
        const index = Number(data.split('_')[1]) || 0;
        const userId = ctx.dbUser._id;

        const meme = await userService.getMyMemeByPage(userId, index);
        if(!meme) {
            await ctx.deleteMessage().catch(() => {});
            await ctx.answerCbQuery('Тут порожньо...💨');
            return handleUser(ctx);
        }

        const totalMemes = await userService.viewMemes(userId);

        const buttons = [
            [{text: '🗑 Видалити', callback_data: `delete_${meme._id}`}],
            [
                {text: index <= 0 ? '⏹' : '⬅️', callback_data: index <= 0 ? 'noop' : `manage_${index - 1}`},
                {text: `${index + 1} / ${totalMemes}`, callback_data: 'noop' },
                {text: index >= totalMemes - 1 ? '⏹' : '➡️', callback_data: index >= totalMemes - 1 ? 'noop' : `manage_${index + 1}`}
            ],
            [{text: '🔙 Назад до профілю', callback_data: 'open_profile'}]
        ];

        const caption = `Твій мем #${index + 1}\n\n❤️ Лайків: ${meme.likesCount || 0}\n💩 Дизлайків: ${meme.dislikesCount || 0}`;

        if (ctx.callbackQuery?.message?.photo) {
            await ctx.editMessageMedia({
                type: 'photo',
                media: meme.imageFileId,
                caption: caption
            }, { reply_markup: { inline_keyboard: buttons }})
        } else {
            if(ctx.session?.lastMsgId){
                await ctx.deleteMessage(ctx.session.lastMsgId).catch(() => {});
            }

            const sentMsg = await ctx.replyWithPhoto(meme.imageFileId, {
                caption,
                reply_markup: {inline_keyboard: buttons}
            })

            ctx.session.lastMsgId = sentMsg.message_id;
        }

        await ctx.answerCbQuery().catch(() => {});
    } catch (error) {
        console.error('Manage Memes Error', error);
        await ctx.answerCbQuery('Помилка завантаження 😵‍💫')
    }
}


module.exports = {handleCreateMeme, handleDeleteMeme, handleManagerMemes, handleAddMemeRequest};