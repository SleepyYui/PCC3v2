//here the event starts
// @ts-ignore
const config = require("../../botconfig/config.json")
// @ts-ignore
const { change_status } = require("../../handlers/functions");
// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = (client: { user: { tag: any; }; guilds: { cache: { size: any; reduce: (arg0: { (a: any, g: { memberCount: any; }): any; (a: any, g: { memberCount: any; }): any; }, arg1: number) => any; }; }; }) => {
  //SETTING ALL GUILD DATA FOR THE DJ ONLY COMMANDS for the DEFAULT
  //client.guilds.cache.forEach(guild=>client.settings.set(guild.id, ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"], "djonlycmds"))
  try{
    try{
      const stringlength = 69;
      logger.cmsg({ text: ""})
      logger.cmsg({ text: `     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`})
      logger.cmsg({ text: `     ┃ `+ " ".repeat(-1+stringlength-` ┃ `.length)+ "┃"})
      logger.cmsg({ text: `     ┃ `+ `Discord Bot is online!`+ " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃"})
      logger.cmsg({ text: `     ┃ `+ `Botname: ${client.user.tag}`+ " ".repeat(-1+stringlength-` ┃ `.length-`Botname: ${client.user.tag}`.length)+ "┃"})
      // logger.cmsg({ text: `     ┃ `+ `BotID: ${client.user.id}`+ " ".repeat(-1+stringlength-` ┃ `.length-`BotID: ${client.user.id}`.length)+ "┃"}) // noone needs this lmao
      // logger.cmsg({ text: `     ┃ `+ `Prefix: ${config.prefix}`+ " ".repeat(-1+stringlength-` ┃ `.length-`Prefix: ${config.prefix}`.length)+ "┃"}) // Not Defined
      // logger.cmsg({ text: `     ┃ `+ `Commands: ${client.commands.size}`+ " ".repeat(-1+stringlength-` ┃ `.length-`Commands: ${client.commands.size}`.length)+ "┃") // Shown in the message after the bot is ready
      logger.cmsg({ text: `     ┃ `+ `Guilds: ${client.guilds.cache.size}`+ " ".repeat(-1+stringlength-` ┃ `.length-`Guilds: ${client.guilds.cache.size}`.length)+ "┃"})
      logger.cmsg({ text: `     ┃ `+ `Users: ${client.guilds.cache.reduce((a: any, g: { memberCount: any; }) => a + g.memberCount, 0)}`+ " ".repeat(-1+stringlength-` ┃ `.length-`Users: ${client.guilds.cache.reduce((a: any, g: { memberCount: any; }) => a + g.memberCount, 0)}`.length)+ "┃"})
      logger.cmsg({ text: `     ┃ `+ " ".repeat(-1+stringlength-` ┃ `.length)+ "┃"})
      logger.cmsg({ text: `     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`})
      logger.cmsg({ text: ""})
    }catch{logger.error({ text: "Error printing startup message"})}
    change_status(client);
    //loop through the status per each 10 minutes
    /*setInterval(()=>{
      change_status(client);
    }, 15 * 1000);
    */
   // No Need since there is only one status

  } catch (e){
    logger.error({ text: e});
  }
}
