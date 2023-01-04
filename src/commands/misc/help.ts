// @ts-ignore
const logger = require("../../handlers/logger");
// @ts-ignore
const database = require("../../handlers/database");
const { EmbedBuilder } = require("discord.js");
// log that the current file was loaded
logger.startup({ text: `Command ${__filename.split("\\").at(-1)} was loaded` });
module.exports = {
    name: "help", //the command name for execution & for helpcmd [OPTIONAL]
    category: "misc", //the command category for helpcmd [OPTIONAL]
    aliases: ["h", "commandinfo", "cmds", "cmd", "halp"], //the command aliases for helpcmd [OPTIONAL]
    cooldown: 3, //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "help [Commandname]", //the command usage for helpcmd [OPTIONAL]
    description: "Returns all commmands, or one specific command", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]


    run: async (client: { commands: { get: (arg0: any) => any; filter: (arg0: (cmd: any) => boolean) => any[]; }; aliases: { get: (arg0: any) => any; }; user: { displayAvatarURL: () => any; }; categories: string | any[]; }, message: { reply: (arg0: { embeds: any[]; }) => void; }, args: string[], plusArgs: any, cmdUser: any, text: any, prefix: any) => {
        logger.debug({ text: `Running command ${__filename.split("\\").at(-1)}` });
        try{
            const embed = new EmbedBuilder()
                .setColor(process.env.EMBED_COLOR)
                //.setThumbnail(client.user.displayAvatarURL())
                .setTitle("No! I won't help you!")
                .setDescription("I'm just a bot, I can't help you with anything! <:hahaha6:740166145167982623> ")
                .setFooter({
                    text: `If you need help, just ping a @helper`,
                    iconURL: client.user.displayAvatarURL()
                });
            await database.addCommandUse("help", cmdUser.id, undefined);
            message.reply({embeds: [embed]});
        } catch (e) {
            logger.error({ text: e});
            return message.reply({embeds: [new EmbedBuilder()
                    .setColor(process.env.EMBED_WRONG_COLOR)
                    .setFooter({
                        text: process.env.EMBED_FOOTER,
                        iconURL: process.env.EMBED_FOOTER_IMAGE
                    })
                    .setTitle(`❌ ERROR | An error occurred`)
                    // @ts-ignore
                    .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
                ]});
        }
    }
}