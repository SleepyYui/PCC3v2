const path = require('path');
const RequireAll = require('require-all');
// @ts-ignore
const logger = require('../utils/logger');
const { Handler}  = require('discord-slash-command-handler');

let discordClient: any;

module.exports = {
   init(client: any, args = { launchTimestamp: Date.now() }) {
      discordClient = client;
      this.initEssentialEvents(client, args);
      this.initEvents(client);
   },

   initEssentialEvents(client = discordClient, args = { launchTimestamp: Date.now() }) {
      client.once('ready', async () => {

         const handler = new Handler(client, {
            commandFolder: "../../commands",
            commandType: "folder",
            eventFolder: "./src/events",
            slashGuilds: [],  // string
            allSlash: true,
            owners: ["443769343138856961"],
   
            handleSlash: true,
            handleNormal: true,
            permissionReply: "You don't have enough permissions to use this command",   
            timeoutMessage: "You are on a timeout",
            errorReply: "Unable to run this command due to errors...",
            notOwnerReply: "You are not the bot-owner",
        });

         const updateBotStatus = async () => {
            await client.user.setActivity(process.env.BOT_STATUS, { type: process.env.BOT_STATUS_TYPE });
         };

         await updateBotStatus();
         // client.setInterval(() => updateBotStatus(), 3600000);

         /*handler.on('normalCommand', (command,command_data) => {

        })*/

         logger.info(`Successfully launched in ${(Date.now() - args.launchTimestamp) / 1000} seconds!`);
      });

      /*client.on('raw', async (event: { t?: any; d?: any; }) => {
         if (event.t !== 'MESSAGE_REACTION_ADD') {
            return;
         }

         const { d: data } = event;
         if (typeof client.channels.cache.get(data.channel_id) === 'undefined') {
            return;
         }

         const channel = await client.channels.fetch(data.channel_id);
         if (channel.messages.cache.has(data.message_id)) {
            return;
         }

         const user = await client.users.fetch(data.user_id);
         const message = await channel.messages.fetch(data.message_id);
         const reaction = message.reactions.resolve(data.emoji.id || data.emoji.name);

         client.emit('messageReactionAdd', reaction, user);
      });*/


      client.on('error', (err: any) => logger.error('The client threw an error', err));

      client.on('shardError', (err: any) => logger.error('A shard threw an error', err));

      client.on('warn', (warn: any) => logger.warn('The client received a warning', warn));
   },

   initEvents(client = discordClient) {
      const events = Object.entries(
         RequireAll({
            dirname: path.join(__dirname, 'events'),
            filter: /^(?!-)(.+)\.js$/,
         }),
      );

      /*
       Binds the events gotten with the code above to the client:
         e[0] is the event name (the name of the file)
         e[1] is the function that will get executed when the event gets fired
       */
      // @ts-ignore
       events.forEach((e) => client.on(e[0], e[1].bind(null, client)));
   },
};
