require('dotenv').config();
const { Telegraf } = require('telegraf');
const connectDB = require('./config/bd');
const authMiddleware = require('./modules/auth/auth.middleware');
const handleCrateMeme = require('./modules/meme/meme.controller')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(authMiddleware);
bot.on('photo',  handleCrateMeme);

bot.start((ctx) => {
    ctx.reply('Hello')
})

async function start() {
    await connectDB();
    bot.launch();
    console.log('Bot started ✅');
}

start();

