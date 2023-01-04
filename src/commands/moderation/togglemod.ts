// @ts-ignore
const logger = require("../../handlers/logger");
// @ts-ignore
const database = require("../../handlers/database");
// log that the current file was loaded
logger.startup({ text: `Command ${__filename.split("\\").at(-1)} was loaded` });
module.exports = {
    name: "tmod", //the command name for execution & for helpcmd [OPTIONAL]
    category: "moderation", //the command category for helpcmd [OPTIONAL]
    aliases: ["togglemod"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 0, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "tmod", //the command usage for helpcmd [OPTIONAL]
    description: "Toggles the Moderator role, if you don't want to get pinged etc.", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]


    run: async (client: any, message: { reply?: any; author?: any; channel?: any; guild?: any; client?: any; content?: string; mentions?: { users: { first: () => any; }; }; }, args: any[], plusArgs: any, cmdUser: any, text: any, prefix: any) => {
        try{
            logger.debug({ text: `Trying to get user with id ${cmdUser.id}` });
            //if (!message.author.roles.find((r: { name: string; }) => r.name === "Mod-Team") || !message.author.roles.find((r: { name: string; }) => r.name === "Administrator")) return;
            logger.debug({ text: `Setting DB entry for command` });
            await database.addCommandUse("tmod", cmdUser.id, undefined);
            try {
                logger.debug({ text: `Trying to toggle role` });
                if (message.author.roles.find((r: { name: string; }) => r.name === "Moderator")) {
                    logger.debug({ text: `Removing role` });
                    message.author.roles.remove(message.guild.roles.find((r: { name: string; }) => r.name === "Moderator"));
                } else {
                    logger.debug({ text: `Adding role` });
                    message.author.roles.add(message.guild.roles.find((r: { name: string; }) => r.name === "Moderator"));
                }
                return await message.reply("You have successfully toggled the Moderator role! You now " + (message.author.roles.find((r: { name: string; }) => r.name === "Moderator") ? "have" : "don't have") + " the role!");
            } catch (err) {
                logger.error({text: err});
                return await message.reply("Something went wrong whilst toggling the Moderator role! Please report this error to <@"+process.env.BOT_OWNER+">!");
            }
        } catch (e) {
            logger.error(e);
        }
    },
};
