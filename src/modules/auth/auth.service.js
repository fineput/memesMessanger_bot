const User = require('../../models/User');

async function findOrCreateUser(ctx){
    const telegramId = ctx.from.id;

    let user = await User.findOne({ telegramId });

    if(!user) {
        user = await User.create({
            telegramId,
            username: ctx.from.username
        });
        console.log(`New user created: ${ctx.from.username}`);
    }

    return user;
}

module.exports = {findOrCreateUser};