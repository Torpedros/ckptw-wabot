const gnrl = require("./tools/general.js");

exports.handler = async (ctx, options) => {
    const senderJid = ctx._sender.jid;
    const senderNumber = senderJid.split("@")[0];

    const checkOptions = {
        admin: {
            function: async () => ((await ctx.isGroup()) ? (await gnrl.isAdmin(ctx, senderJid)) === 0 : null),
            msg: global.msg.admin
        },
        banned: {
            function: async () => await global.db.get(`user.${senderNumber}.isBanned`),
            msg: global.msg.banned
        },
        botAdmin: {
            function: async () => ((await ctx.isGroup()) ? (await gnrl.isBotAdmin(ctx)) === 0 : null),
            msg: global.msg.botAdmin
        },
        coin: {
            function: async () => {
                if (global.system.useCoin) {
                    let getCoin = await global.db.get(`user.${senderNumber}.coin`);

                    if (getCoin === undefined) {
                        await global.db.add(`user.${senderNumber}.coin`, 10);
                        getCoin = 10;
                    }

                    if (!ctx._args.length) return false;

                    const isOwner = await gnrl.isOwner(ctx);
                    if (isOwner === 1) return false;

                    const isPremium = await global.db.get(`user.${senderNumber}.isPremium`);
                    if (isPremium) return false;

                    const requiredCoins = options.coin || 0;

                    if (getCoin < requiredCoins) return true;

                    await global.db.subtract(`user.${senderNumber}.coin`, requiredCoins);
                }
            },
            msg: global.msg.coin
        },
        group: {
            function: async () => await !ctx.isGroup(),
            msg: global.msg.group
        },
        owner: {
            function: async () => (await gnrl.isOwner(ctx, senderNumber)) === 0,
            msg: global.msg.owner
        },
        premium: {
            function: async () => {
                if (global.system.useCoin) {
                    const isPremium = await global.db.get(`user.${senderNumber}.isPremium`);
                    if (!isPremium) return true;

                    return false;
                }
            },
            msg: global.msg.premium
        },
        private: {
            function: async () => await ctx.isGroup(),
            msg: global.msg.private
        }
    };

    let status = false;
    let message = null;

    for (const option of Object.keys(options)) {
        const checkOption = checkOptions[option];
        if (await checkOption.function()) {
            status = true;
            message = checkOption.msg;
            break;
        }
    }

    return {
        status,
        message
    };
};