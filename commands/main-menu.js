const {
    getList
} = require("../tools/list.js");
const {
    getRandomElement
} = require("../tools/general.js");
const {
    bold,
    ButtonBuilder,
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "menu",
    aliases: ["help", "?"],
    category: "main",
    code: async (ctx) => {
        try {
            const text = await getList("menu", ctx);
            const fakeProduct = {
                key: {
                    fromMe: false,
                    participant: ctx._sender.jid, // Change it to "0@s.whatsapp.net" if you want to become an official WhatsApp account.
                    ...({
                        remoteJid: "status@broadcast"
                    })
                },
                message: {
                    productMessage: {
                        product: {
                            title: global.bot.name,
                            description: null,
                            currencyCode: "IDR",
                            priceAmount1000: "1000",
                            retailerId: global.bot.name,
                            productImageCount: 0
                        },
                        businessOwnerJid: ctx._sender.jid
                    }
                }
            };

            if (global.system.useInteractiveMessage) {
                const button1 = new ButtonBuilder().setId(`${ctx._used.prefix}owner`).setDisplayText("👨‍💻 Owner").setType("quick_reply").build();
                const button2 = new ButtonBuilder().setId("button2").setDisplayText("🌐 Group Chat").setType("cta_url").setURL(global.bot.groupChat).setMerchantURL("https://google.co").build();

                return ctx.replyInteractiveMessage({
                    body: text,
                    footer: global.msg.watermark,
                    nativeFlowMessage: {
                        buttons: [button1, button2]
                    }
                })
            }

            return ctx.sendMessage(
                ctx.id, {
                    text: text,
                    contextInfo: {
                        mentionedJid: [ctx._sender.jid],
                        externalAdReply: {
                            mediaType: 1,
                            previewType: 0,
                            mediaUrl: global.bot.groupChat,
                            title: global.msg.watermark,
                            body: null,
                            renderLargerThumbnail: true,
                            thumbnailUrl: global.bot.thumbnail,
                            sourceUrl: global.bot.groupChat
                        },
                        forwardingScore: 9999,
                        isForwarded: true
                    },
                    mentions: [ctx._sender.jid]
                }, {
                    quoted: fakeProduct
                }
            );
        } catch (error) {
            console.error("Error:", error);
            return ctx.reply(quote(`${bold("[ ! ]")} Terjadi kesalahan: ${error.message}`));
        }
    }
};