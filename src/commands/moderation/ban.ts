// @ts-ignore
const logger = require("../../handlers/logger");
// @ts-ignore
const database = require("../../handlers/database");
// log that the current file was loaded
logger.startup({ text: `Command ${__filename.split("\\").at(-1)} was loaded` });
module.exports = {
    name: 'ban',
    aliases: ['ban_user'],
    description: 'Command description',
    reqArgs: true,
    usage: '{ @user } { reason }',
    exampleUsage: '!ban @user#1234 Spamming',
    category: 'moderation',
    cooldown: 300,

    // eslint-disable-next-line no-unused-vars
    async run(ctx: any) {
        try{
            //things you can directly access in an interaction!
            const { member, channelId, guildId, applicationId,
                commandName, deferred, replied, ephemeral,
                options, id, createdTimestamp
            } = ctx;

            const { guild } = member;

            logger.debug({
                text: `Interaction received: ${commandName}`
            })


            let ban_user = options.getUser("user");
            let ban_reason = options.getString("reason");
            if (ban_reason == null) {
                ban_reason = "No reason provided.";
            }

            try {
                await database.addban(ban_user.id, ban_reason, '9999-12-31 23:59:59', member.id);
                try {
                    await guild.members.ban(ban_user, { reason: ban_reason });
                    await ctx.channel.send({content: `Banned **${ban_user.username}**!`});
                } catch (err) {
                    logger.error({text: err});
                    ctx.channel.send({
                        content: `Something went wrong whilst banning **${ban_user.username}**!\n*User might be already banned or I don't have the permissions to ban them.*`,
                    });
                }
            } catch (err) {
                logger.error({text: err});
                try {
                    await guild.members.ban(ban_user, { reason: ban_reason });
                    await ctx.channel.send({content: `Banned **${ban_user.username}**!\n***COULD NOT SET ENTRY IN DATABASE!!! PLEASE REPORT THIS ERROR TO <@${process.env.BOT_OWNER}>!!!***`});
                } catch (err) {
                    logger.error({text: err});
                    ctx.channel.send({
                        content: `Something went wrong whilst banning **${ban_user.username}**!\n***COULD NOT SET ENTRY IN DATABASE!!! PLEASE REPORT THIS ERROR TO <@${process.env.BOT_OWNER}>!!!***`,
                    });
                }
            }
        } catch (e) {
            logger.error(e);
        }
    },
};