async function replaceMessage(ctx, text, extra = {}) {
    try {
        if(ctx.session?.lastMessageId){
            await ctx.deleteMessage(ctx.session.lastMessageId).catch(() => {});
        }

        await ctx.deleteMessage().catch(() => {});

        let sentMessage;

        if (extra.parse_mode === 'MarkdownV2' || extra.reply_markup) {
            sentMessage = await ctx.reply(text, extra);
        } else {
            sentMessage = await ctx.reply(text, extra);
        }

        ctx.session.lastMessageId = sentMessage.message_id;
    } catch(error){
        console.error('ReplaceMessage Error:', error);
    }
}

module.exports = { replaceMessage };