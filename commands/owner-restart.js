const {
    bold,
    monospace,
    quote
} = require("@mengkodingan/ckptw");
const {
    exec
} = require("child_process");

module.exports = {
    name: "restart",
    category: "owner",
    code: async (ctx) => {
        const {
            status,
            message
        } = await global.handler(ctx, {
            owner: true
        });
        if (status) return ctx.reply(message);

        try {
            await ctx.reply(global.msg.wait);

            exec(`pm2 restart ckptw-wabot`); // PM2.
        } catch (error) {
            console.error("Error:", error);
            return ctx.reply(quote(`${bold("[ ! ]")} Terjadi kesalahan: ${error.message}`));
        }
    }
};