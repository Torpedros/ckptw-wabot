const {
    bold,
    quote
} = require("@mengkodingan/ckptw");
const {
    performance
} = require("perf_hooks");

module.exports = {
    name: "speed",
    category: "info",
    code: async (ctx) => {
        try {
            const startTime = performance.now();
            const testSpeed = await ctx.reply(quote("Menguji kecepatan..."));
            const responseTime = (performance.now() - startTime).toFixed(2);
            await ctx.editMessage(testSpeed.key, quote(`Merespon dalam ${responseTime} ms.`));
        } catch (error) {
            console.error("Error:", error);
            return ctx.reply(quote(`${bold("[ ! ]")} Terjadi kesalahan: ${error.message}`));
        }
    }
};