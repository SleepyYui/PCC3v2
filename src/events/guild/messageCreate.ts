// @ts-ignore
const Discord = require("discord.js");
// @ts-ignore
const logger = require("../../handlers/logger");

module.exports = async (client: any, message: any) => {
    logger.debug({text: `Message received: ${message}`});
    if(!message.guild || !message.channel || message.author.bot) return;
    if(message.channel.partial) await message.channel.fetch(undefined, undefined);
    if(message.partial) await message.fetch(undefined, undefined);
    let prefix = process.env.PREFIX;
    if (prefix === undefined) {
        logger.error({text: `Prefix is undefined!\nBug?`});
        prefix = ",";
    }
    logger.debug({text: `Checking if prefix is ${prefix}`});
    if(message.content.startsWith(prefix)) {
        logger.debug({text: `Prefix is ${prefix}`});
        logger.debug({text: `Checking for arguments`});
        const args = message.content.slice(1).trim().split(/ +/).filter(Boolean);
        const cmd = args.length > 0 ? args.shift().toLowerCase() : null;
        logger.debug({text: `Checking if command ${cmd} exists...`});
        let command = client.commands.get(cmd);
        if(!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) {
            logger.debug({text: `Checking command permissions for ${command.name}`});
            try {
                if (command.memberpermissions && command.memberpermissions.length > 0 && !message.member.permissions.has(command.memberpermissions)) {
                    return false;
                } else if (command.requiredroles && command.requiredroles.length > 0 && message.member.roles.cache.size > 0 && !message.member.roles.cache.some((r: { id: any; }) => command.requiredroles.includes(r.id))) {
                    return false;
                } else if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(message.author.id)) {
                    return false;
                } else if (command.minargs && command.minargs > 0 && args.length < command.minargs) {
                    return message.reply({
                        embeds: [new Discord.EmbedBuilder()
                            .setColor(process.env.EMBED_WRONG_COLOR)
                            .setFooter({
                                text: process.env.EMBED_FOOTER,
                                iconURL: process.env.EMBED_FOOTER_IMAGE
                            })
                            .setTitle(":x: Wrong Command Usage!")
                            .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
                    }).then((msg: { delete: () => Promise<any>; }) => {
                        setTimeout(() => {
                            msg.delete().catch((e) => {
                                logger.debug(e)
                            })
                        }, 3000)
                    }).catch((e: any) => {
                        logger.debug(e)
                    });
                } else if (command.maxargs && command.maxargs > 0 && args.length > command.maxargs) {
                    return message.reply({
                        embeds: [new Discord.EmbedBuilder()
                            .setColor(process.env.EMBED_WRONG_COLOR)
                            .setFooter({
                                text: process.env.EMBED_FOOTER,
                                iconURL: process.env.EMBED_FOOTER_IMAGE
                            })
                            .setTitle(":x: Wrong Command Usage!")
                            .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argstoomany_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
                    }).then((msg: { delete: () => Promise<any>; }) => {
                        setTimeout(() => {
                            msg.delete().catch((e) => {
                                logger.debug(e)
                            })
                        }, 3000)
                    }).catch((e: any) => {
                        logger.debug(e)
                    });
                } else if (command.minplusargs && command.minplusargs > 0 && args.join(" ").split("++").filter(Boolean).length < command.minplusargs) {
                    return message.reply({
                        embeds: [new Discord.EmbedBuilder()
                            .setColor(process.env.EMBED_WRONG_COLOR)
                            .setFooter({
                                text: process.env.EMBED_FOOTER,
                                iconURL: process.env.EMBED_FOOTER_IMAGE
                            })
                            .setTitle(":x: Wrong Command Usage!")
                            .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
                    }).then((msg: { delete: () => Promise<any>; }) => {
                        setTimeout(() => {
                            msg.delete().catch((e) => {
                                logger.debug(e)
                            })
                        }, 3000)
                    }).catch((e: any) => {
                        logger.debug(e)
                    });
                } else if (command.maxplusargs && command.maxplusargs > 0 && args.join(" ").split("++").filter(Boolean).length > command.maxplusargs) {
                    return message.reply({
                        embeds: [new Discord.EmbedBuilder()
                            .setColor(process.env.EMBED_WRONG_COLOR)
                            .setFooter({
                                text: process.env.EMBED_FOOTER,
                                iconURL: process.env.EMBED_FOOTER_IMAGE
                            })
                            .setTitle(":x: Wrong Command Usage!")
                            .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
                    }).then((msg: { delete: () => Promise<any>; }) => {
                        setTimeout(() => {
                            msg.delete().catch((e) => {
                                logger.debug(e)
                            })
                        }, 3000)
                    }).catch((e: any) => {
                        logger.debug(e)
                    });
                }
                logger.debug({text: `Running command ${command.name}`});
                command.run(client, message, args, args.join(" ").split("++").filter(Boolean), message.member, args.join(" "), prefix);
                return true;
            } catch (error) {
                logger.error({text: "Error in command " + command.name + ": " + error});
            }
        }
    }
    logger.debug({text: `Message is not a command`});
    // NON-COMMAND STUFF STARTS HERE
}
