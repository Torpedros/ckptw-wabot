const {
    createAPIUrl
} = require("../tools/api.js");
const {
    bold,
    monospace,
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "gempa",
    aliases: ["gempabumi"],
    category: "internet",
    code: async (ctx) => {
        const {
            status,
            message
        } = await global.handler(ctx, {
            banned: true,
            coin: 3
        });
        if (status) return ctx.reply(message);

        const apiUrl = await createAPIUrl("https://data.bmkg.go.id", "/DataMKG/TEWS/autogempa.json", {});

        try {
            const {
                data
            } = await axios.get(apiUrl);
            const gempa = data.Infogempa.gempa;

            return ctx.sendMessage({
                image: {
                    url: `https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}`
                },
                mimetype: mime.contentType("png"),
                caption: `${gempa.Wilayah}\n` +
                    "-----\n" +
                    `${quote(`Tanggal: ${gempa.Tanggal}`)}\n` +
                    `${quote(`Potensi: ${gempa.Potensi}`)}\n` +
                    `${quote(`Magnitude: ${gempa.Magnitude}`)}\n` +
                    `${quote(`Kedalaman: ${gempa.Kedalaman}`)}\n` +
                    `${quote(`Koordinat: ${gempa.Coordinates}`)}\n` +
                    `${quote(`Dirasakan: ${gempa.Dirasakan}`)}\n` +
                    "\n" +
                    global.msg.footer
            });
        } catch (error) {
            console.error("Error:", error);
            if (error.status !== 200) return ctx.reply(global.msg.notFound);
            return ctx.reply(quote(`${bold("[ ! ]")} Terjadi kesalahan: ${error.message}`));
        }
    }
};