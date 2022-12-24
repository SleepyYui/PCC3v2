// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = async (client: any, oldState: { streaming: any; serverDeaf: any; serverMute: any; selfDeaf: any; selfMute: any; selfVideo: any; channelId: any; }, newState: { streaming: any; serverDeaf: any; serverMute: any; selfDeaf: any; selfMute: any; selfVideo: any; channelId: any; channel: { type: string; }; guild: { me: { voice: { suppress: any; setSuppressed: (arg0: boolean) => any; }; }; }; }) => {
    if (
        (!oldState.streaming && newState.streaming)   ||
        (oldState.streaming && !newState.streaming)   ||
        (!oldState.serverDeaf && newState.serverDeaf) ||
        (oldState.serverDeaf && !newState.serverDeaf) ||
        (!oldState.serverMute && newState.serverMute) ||
        (oldState.serverMute && !newState.serverMute) || 
        (!oldState.selfDeaf && newState.selfDeaf)     ||
        (oldState.selfDeaf && !newState.selfDeaf)     ||
        (!oldState.selfMute && newState.selfMute)     ||
        (oldState.selfMute && !newState.selfMute)     ||
        (!oldState.selfVideo && newState.selfVideo)   ||
        (oldState.selfVideo && !newState.selfVideo) 
     )
    if (!oldState.channelId && newState.channelId) {
        if(newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress){
          try{
            await newState.guild.me.voice.setSuppressed(false);
          }catch (e){
            logger.error({ text: `Error setting voice suppress to false\n` + e});
          }
        }
        return
    }
    if (oldState.channelId && !newState.channelId) {
        return
    }
    if (oldState.channelId && newState.channelId) {
        if(newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress){
          try{
            await newState.guild.me.voice.setSuppressed(false);
          }catch (e){
            logger.error({ text: `Error setting voice suppress to false\n` + e});
          }
        }
        return;
    }
}
