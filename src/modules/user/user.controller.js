const userService = require('./user.service');

async function handleUser(ctx) {
    try {
        if (!ctx.session) ctx.session = {};
        const userId = ctx.dbUser._id;

        if (!ctx.callbackQuery) {
            await ctx.deleteMessage().catch(() => {});
        }
        
        if(ctx.session?.lastMsgId){
            await ctx.deleteMessage(ctx.session.lastMsgId).catch(() => {});
            ctx.session.lastMsgId = null;
        }

        const [memeCount, reputation] = await Promise.all([
            userService.viewMemes(userId),
            userService.userReputation(userId)
        ])
 
        const message = `👤 **Твій профіль**\n\n` +
                        `🆔 Твій ID: \`${ctx.dbUser.telegramId}\`\n` +
                        `⭐ Репутація: ${reputation}\n` +
                        `🖼 Завантажено мемів: ${memeCount}`;

        const extra = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [[{ text: '🖼 Керувати мемами', callback_data: 'manage_my_memes' }]]
            }
        }

        const formattedMsg = message.replace(/-/g, '\\-');

        const sentMsg = await ctx.reply(formattedMsg, extra);

        ctx.session.lastMsgId = sentMsg.message_id;
    } catch (error) {
        console.error('Profile Controller Error: ', error);
        await ctx.reply('Не вдалося завантажити дані профілю 😔\nЗверніться, будь ласка, до адміна: @fineput')
    }
}

module.exports = { handleUser };

