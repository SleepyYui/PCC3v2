// @ts-ignore
const { onCoolDown, replacemsg } = require("../../handlers/functions");
// @ts-ignore
const Discord = require("discord.js");
// @ts-ignore
const logger = require("../../handlers/logger");

module.exports = (client: { slashCommands: { has: (arg0: string) => any; get: (arg0: string) => boolean; }; }, interaction: {
    user: any;
    commandName: any; options: { getSubcommand: () => any; }; reply: (arg0: { ephemeral: boolean; embeds: any[]; }) => any; member: any; guild: any; isButton: () => any; type: { toString: () => string; }; }) => {
    const CategoryName = interaction.commandName;
    let command = false;
    try{
        if (client.slashCommands.has(CategoryName + interaction.options.getSubcommand())) {
            command = client.slashCommands.get(CategoryName + interaction.options.getSubcommand());
        }
    }catch{
        if (client.slashCommands.has("normal" + CategoryName)) {
            command = client.slashCommands.get("normal" + CategoryName);
        }
    }
    if (command) {
        if (onCoolDown(interaction, command)) {
            return interaction.reply({
                ephemeral: true,
                embeds: [new Discord.MessageEmbed()
                    .setColor(process.env.EMBED_WRONG_COLOR)
                    .setFooter(process.env.EMBED_FOOTER, process.env.EMBED_FOOTER_ICON)
                    .setTitle(replacemsg(process.env.COMMAND_COOLDOWN, {
                        prefix: process.env.PREFIX,
                        command: command,
                        timeLeft: onCoolDown(interaction, command)
                    }))]
            });
        }
        //execute the Command
        // @ts-ignore
        command.run(client, interaction, interaction.member, interaction.guild)
    }
    // if (interaction.isButton()) return buttons(interaction);
    logger.debug({ text: `${interaction.type} ${interaction.guild.name} ${interaction.user.username} ${interaction.commandName} ${interaction.options.getSubcommand()}` });
    // if (interaction.type.toString() === "MODAL_SUBMIT") return modalSubmit(client, interaction);
}