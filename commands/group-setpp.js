const {
    download
} = require("../tools/general.js");
const {
    bold,
    quote
} = require("@mengkodingan/ckptw");
const {
    MessageType
} = require("@mengkodingan/ckptw/lib/Constant");

module.exports = {
    name: "setpp",
    aliases: ["seticon", "setprofile"],
    category: "group",
    code: async (ctx) => {
        const {
            status,
            message
        } = await global.handler(ctx, {
            admin: true,
            banned: true,
            botAdmin: true,
            group: true
        });
        if (status) return ctx.reply(message);

        const msgType = ctx.getMessageType();
        const quotedMessage = ctx._msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (msgType !== MessageType.imageMessage && !quotedMessage) return ctx.reply(quote(`${bold("[ ! ]")} Berikan atau balas media berupa gambar!`));

        try {
            const type = quotedMessage ? ctx._self.getContentType(quotedMessage) : null;
            const object = type ? quotedMessage[type] : null;
            const buffer = type === "imageMessage" ? await download(object, type.slice(0, -7)) : await ctx.getMediaMessage(ctx._msg, "buffer");

            await ctx._client.updateProfilePicture(ctx.id, buffer);

            return ctx.reply(quote(`${bold("[ ! ]")} Berhasil mengubah gambar profil foto grup!`));
        } catch (error) {
            console.error("Error:", error);
            return ctx.reply(quote(`${bold("[ ! ]")} Terjadi kesalahan: ${error.message}`));
        }
    }
};