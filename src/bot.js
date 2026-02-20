require('dotenv').config();
const { Telegraf } = require('telegraf');
const connectDB = require('./config/bd');
const authMiddleware = require('./modules/auth/auth.middleware');
const {handleCreateMeme} = require('./modules/meme/meme.controller');
const {handleShowFeed} = require('./modules/feed/feed.controller');
const {handleReaction} = require('./modules/reaction/reaction.controller')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(authMiddleware);


bot.start(async (ctx) => {
    const userName = ctx.from.first_name || 'Друже';

    await ctx.reply(`Привіт, ${userName}! Ласкаво просимо до Memes Messanger. Обирай дію: `, {
        reply_markup: {
            keyboard: [
                [{text: '🖼 Переглянути меми'}],
                [{text: '👤 Мій профіль'}, { text: '➕ Додати мем' }],
            ],
            resize_keyboard: true
        }
    })
})

bot.hears('🖼 Переглянути меми', handleShowFeed);
bot.action(/^(like|dislike)_.+/, handleReaction);
bot.action('next_meme', handleShowFeed);

bot.hears('👤 Мій профіль', async (ctx) => {
    const user = ctx.dbUser;
    await ctx.reply(`Твій профіль:\n👤 Ім'я: ${ctx.from.first_name}\n🆔 ID: ${user.telegramId}`);
});

bot.hears('➕ Додати мем', (ctx) => {
    ctx.reply('Просто надішліть мені картинку з описом (або без), і я її збережу!');
});

bot.on('photo', handleCreateMeme);

async function bootstrap() {
    await connectDB();
    await bot.launch();
    console.log('Bot started ✅');
}

bootstrap();

