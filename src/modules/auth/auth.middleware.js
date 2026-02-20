const { findOrCreateUser } = require('./auth.service');

async function authMiddleware(ctx, next) {
    const user = await findOrCreateUser(ctx);

    ctx.dbUser = user;
    return next();
}

module.exports = authMiddleware;
