// @ts-ignore
const logger = require("../../handlers/logger");
// @ts-ignore
const database = require("../../handlers/database");
// log that the current file was loaded
logger.startup({ text: `Slash Command ${__filename.split("\\").at(-1)} was loaded` });
module.exports = {
    name: "ban",
    description: "Bans a user",
    cooldown: 0,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    options: [
        {"User": { name: "user", description: "Bans the selected user", required: true }},
        {"String": { name: "reason", description: "Reason for the ban", required: false }}
    ],
    run: async (client: any, interaction: { reply?: any; member?: any; channelId?: any; guildId?: any; applicationId?: any; commandName?: any; deferred?: any; replied?: any; ephemeral?: any; options?: any; id?: any; createdTimestamp?: any; }) => {
        try{

            //things you can directly access in an interaction!
            const { member, channelId, guildId, applicationId,
                commandName, deferred, replied, ephemeral,
                options, id, createdTimestamp
            } = interaction;

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
                    await guild.members.ban(ban_user, { days:7, reason: ban_reason + " | banned by " + member.tag + " (" + member.id + ")" });
                    await interaction.reply({content: `Banned **${ban_user.tag}**!`, ephemeral: true});
                } catch (err) {
                    logger.error({text: err});
                    interaction.reply({
                        content: `Something went wrong whilst banning **${ban_user.tag}**!\n*User might be already banned or I don't have the permissions to ban them.*`,
                        ephemeral: true
                    });
                }
            } catch (err) {
                logger.error({text: err});
                try {
                    await guild.members.ban(ban_user, { days:7, reason: ban_reason + " | (BAN NOT LOGGED)" + " | banned by " + member.tag + " (" + member.id + ")" });
                    await interaction.reply({content: `Banned **${ban_user.tag}**!\n***COULD NOT SET ENTRY IN DATABASE!!! PLEASE REPORT THIS ERROR TO <@${process.env.BOT_OWNER}>!!!***`, ephemeral: true});
                } catch (err) {
                    logger.error({text: err});
                    interaction.reply({
                        content: `Something went wrong whilst banning **${ban_user.tag}**!\n***COULD NOT SET ENTRY IN DATABASE!!! PLEASE REPORT THIS ERROR TO <@${process.env.BOT_OWNER}>!!!***`,
                        ephemeral: true
                    });
                }
            }
        } catch (e) {
            logger.error(e);
        }
    }
}
