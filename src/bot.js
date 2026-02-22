require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const connectDB = require('./config/bd');
const authMiddleware = require('./modules/auth/auth.middleware');
const {handleCreateMeme, handleManagerMemes, handleDeleteMeme, handleAddMemeRequest} = require('./modules/meme/meme.controller');
const {handleShowFeed} = require('./modules/feed/feed.controller');
const {handleReaction} = require('./modules/reaction/reaction.controller');
const {handleUser} = require('./modules/user/user.controller');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

bot.use(authMiddleware);


bot.start(async (ctx) => {
    const userName = ctx.from.first_name || 'Друже';

    const welcomeText = 
        `Привіт, ${userName}! 👋\n\n` +
        `Ласкаво просимо до **Memes Messenger** — місця, де контент створюєш ти!\n\n` +
        `**Що тут можна робити?**\n` +
        `🖼 **Дивитися меми:** Гортай стрічку, став лайки ❤️ або дизлайки 💩\n` +
        `➕ **Додавати своє:** Ділися смішними картинками та заробляй репутацію.\n` +
        `👤 **Рости в рейтингу:** Кожні 3 лайки підвищують твою карму!\n\n` +
        `Тисни на кнопки нижче, щоб почати 👇`;

    await ctx.reply(welcomeText, {
        parse_mode: 'Markdown',
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

bot.action('open_profile', async (ctx) => {
    await ctx.deleteMessage();
    await handleUser(ctx);
});

bot.action('noop', (ctx) => ctx.answerCbQuery());

bot.action(/^delete_(.+)/, handleDeleteMeme);

bot.action('next_meme', handleShowFeed);
bot.action('manage_my_memes', handleManagerMemes);
bot.action(/^manage_(\d+)/, handleManagerMemes);
 
bot.hears('👤 Мій профіль', handleUser);

bot.hears('➕ Додати мем', handleAddMemeRequest);
bot.on('photo', handleCreateMeme);

async function bootstrap() {
    await connectDB();
    await bot.launch();
    console.log('Bot started ✅');
}

bootstrap();

