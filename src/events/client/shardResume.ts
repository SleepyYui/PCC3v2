//here the event starts
// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = (client: any, id: any, replayedEvents: any) => {
    logger.info({ text: `Shard #${id} Resumed`});
}
