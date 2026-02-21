const userService = require('./user.service');

async function handleUser(ctx) {
    try {
        const userId = ctx.dbUser._id;

        const [memeCount, reputation] = await Promise.all([
            userService.viewMemes(userId),
            userService.userReputation(userId)
        ])
 
        const message = `👤 **Твій профіль**\n\n` +
                        `🆔 Твій ID: \`${ctx.dbUser.telegramId}\`\n` +
                        `⭐ Репутація: ${reputation}\n` +
                        `🖼 Завантажено мемів: ${memeCount}`;
        
        await ctx.replyWithMarkdownV2(message.replace(/-/g, '\\-'), {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🖼 Керувати мемами', callback_data: 'manage_my_memes' }
                    ]
                ]
            }
        });
    } catch (error) {
        console.error('Profile Controller Error: ', error);
        await ctx.reply('Не вдалося завантажити дані профілю 😔\nЗверніться, будь ласка, до адміна: @fineput')
    }
}

module.exports = { handleUser };

