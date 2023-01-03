// @ts-ignore
const logger = require("../../handlers/logger");
// @ts-ignore
const database = require("../../handlers/database");
// log that the current file was loaded
logger.startup({ text: `Command ${__filename.split("\\").at(-1)} was loaded` });
module.exports = {
    name: "ban", //the command name for execution & for helpcmd [OPTIONAL]
    category: "moderation", //the command category for helpcmd [OPTIONAL]
    aliases: ["Ban", "bann", "Bann"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 0, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "ban <user> [options]", //the command usage for helpcmd [OPTIONAL]
    description: "Bans a user", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]


    run: async (client: any, message: { reply?: any; author?: any; channel?: any; guild?: any; client?: any; content?: string; mentions?: { users: { first: () => any; }; }; }, args: any[], plusArgs: any, cmdUser: any, text: any, prefix: any) => {
        try{

            const { guild } = message;
            let ban_user
            if(args[0]) {
                try {
                    let userid = args[0].replace(/[\\<>@#&!]/g, "");
                    logger.debug({ text: `Trying to get user with id ${userid}` });
                    ban_user = await guild.members.fetch(userid);
                } catch (e) {
                    return message.reply("Couldn't find user **" + args[0] + "**!\nPlease mention a user or use a valid user ID!")
                }
            }
            let ban_reason
            if (args[1]) {
                ban_reason = args.slice(1).join(" ")
            } else {
                ban_reason = "No reason provided.";
            }

            try {
                // @ts-ignore
                await database.addban(ban_user.id, ban_reason, '9999-12-31 23:59:59', message.author.id);
                try {
                    await guild.members.ban(ban_user, { days:7, reason: ban_reason + " | banned by " + message.author.tag + " (" + message.author.id + ")" });
                    // @ts-ignore
                    await message.channel.send({content: `Banned **${ban_user.tag}**!`});
                } catch (err) {
                    logger.error({text: err});
                    message.channel.send({
                        // @ts-ignore
                        content: `Something went wrong whilst banning **${ban_user.username}**!\n*User might be already banned or I don't have the permissions to ban them.*`,
                    });
                }
            } catch (err) {
                logger.error({text: err});
                try {
                    await guild.members.ban(ban_user, { days:7, reason: ban_reason + " | (BAN NOT LOGGED)" + " | banned by " + message.author.tag + " (" + message.author.id + ")"});
                    // @ts-ignore
                    await message.channel.send({content: `Banned **${ban_user.tag}**!\n***COULD NOT SET ENTRY IN DATABASE!!! PLEASE REPORT THIS ERROR TO <@${process.env.BOT_OWNER}>!!!***`});
                } catch (err) {
                    logger.error({text: err});
                    message.channel.send({
                        // @ts-ignore
                        content: `Something went wrong whilst banning **${ban_user.tag}**!\n***COULD NOT SET ENTRY IN DATABASE!!! PLEASE REPORT THIS ERROR TO <@${process.env.BOT_OWNER}>!!!***`,
                    });
                }
            }
        } catch (e) {
            logger.error(e);
        }
    },
};