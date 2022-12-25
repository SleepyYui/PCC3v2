// @ts-ignore
const logger = require("../../handlers/logger");
// @ts-ignore
const database = require("../../handlers/database");
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

            await guild.banMember(ban_user.id, { reason: ban_reason });
            await database.addban(ban_user.id, ban_reason, '9999-12-31 23:59:59');
            await interaction.reply({content: `Banned **${ban_user.name}**!`, ephemeral: true});


        } catch (e) {
            logger.error(e);
        }
    }
}
