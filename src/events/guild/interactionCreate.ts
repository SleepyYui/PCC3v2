// @ts-ignore
const config = require(`../../botconfig/config.json`);
// @ts-ignore
const { onCoolDown, replacemsg } = require("../../handlers/functions");
// @ts-ignore
const Discord = require("discord.js");
// @ts-ignore
const logger = require("../../handlers/logger");

module.exports = (client: { slashCommands: { has: (arg0: string) => any; get: (arg0: string) => boolean; }; }, interaction: { commandName: any; options: { getSubcommand: () => any; }; reply: (arg0: { ephemeral: boolean; embeds: any[]; }) => any; member: any; guild: any; isButton: () => any; type: { toString: () => string; }; }) => {

}