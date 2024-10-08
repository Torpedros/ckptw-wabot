const {
    createAPIUrl
} = require("../tools/api.js");
const {
    bold,
    monospace,
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const {
    Sticker,
    StickerTypes
} = require("wa-sticker-formatter");

module.exports = {
    name: "emojigif",
    aliases: ["egif"],
    category: "maker",
    code: async (ctx) => {
        const {
            status,
            message
        } = await global.handler(ctx, {
            banned: true,
            coin: 3
        });
        if (status) return ctx.reply(message);

        const [emoji] = ctx._args;

        if (!ctx._args.length) return ctx.reply(
            `${quote(global.msg.argument)}\n` +
            quote(`Contoh: ${monospace(`${ctx._used.prefix + ctx._used.command} 😱`)}`)
        );

        try {
            const apiUrl = createAPIUrl("vyturex", `/emoji-gif`, {
                emoji
            });
            const {
                data
            } = await axios.get(apiUrl);

            const sticker = new Sticker(data.gifUrl, {
                pack: global.sticker.packname,
                author: global.sticker.author,
                type: StickerTypes.FULL,
                categories: ["🤩", "🎉"],
                id: ctx.id,
                quality: 50
            });

            return ctx.reply(await sticker.toMessage());
        } catch (error) {
            console.error("Error", error);
            return ctx.reply(quote(`${bold("[ ! ]")} Terjadi kesalahan: ${error.message}`));
        }
    }
};