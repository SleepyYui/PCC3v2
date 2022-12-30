// @ts-ignore
const logger = require("../../handlers/logger");
// @ts-ignore
const database = require("../../handlers/database");
// log that the current file was loaded
logger.startup({ text: `Slash Command ${__filename.split("\\").at(-1)} was loaded` });
module.exports = {
    name: "unban",
    description: "Unbans a user",
    cooldown: 0,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    options: [
        {"User": { name: "user", description: "Unbans the selected user", required: true }},
        {"String": { name: "reason", description: "Reason for the unban", required: false }}
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


            let unban_user = options.getUser("user");
            let unban_reason = options.getString("reason");
            if (unban_reason == null) {
                unban_reason = "No reason provided.";
            }

            try {
                await database.addunban(unban_user.id, unban_reason, member.id);
                try {
                    await guild.members.unban(unban_user, { reason: unban_reason });
                    await interaction.reply({content: `Unbanned **${unban_user.username}**!`, ephemeral: true});
                } catch (err) {
                    logger.error({text: err});
                    interaction.reply({
                        content: `Something went wrong whilst unbanning **${unban_user.username}**!\n*User might be already unbanned or I don't have the permissions to unban them.*`,
                        ephemeral: true
                    });
                }
            } catch (err) {
                logger.error({text: err});
                try {
                    await guild.members.unban(unban_user, { reason: unban_reason });
                    await interaction.reply({content: `Unbanned **${unban_user.username}**!\n***COULD NOT SET ENTRY IN DATABASE!!! PLEASE REPORT THIS ERROR TO <@${process.env.BOT_OWNER}>!!!***`, ephemeral: true});
                } catch (err) {
                    logger.error({text: err});
                    interaction.reply({
                        content: `Something went wrong whilst unbanning **${unban_user.username}**!\n***COULD NOT SET ENTRY IN DATABASE!!! PLEASE REPORT THIS ERROR TO <@${process.env.BOT_OWNER}>!!!***`,
                        ephemeral: true
                    });
                }
            }





        } catch (e) {
            logger.error(e);
        }
    }
}
