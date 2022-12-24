// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = async (client: any, thread: { joinable: any; join: () => any; id: any; }) => {
    if(thread.joinable){
        try{
            await thread.join();
        }catch (e){
            logger.error({ text: `Error joining thread ${thread.id}\n` + e});
        }
    }
}
