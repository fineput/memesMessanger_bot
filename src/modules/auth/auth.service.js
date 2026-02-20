const User = require('../../models/User');

async function findOrCreateUser(ctx){
    const telegramId = ctx.from.id;

    const user = await User.findOne({ telegramId });

    if(!user) {
        const newUser = User.create({
            telegramId,
            username: ctx.from.username
        });
    }

    return user;
}

module.exports = {findOrCreateUser};