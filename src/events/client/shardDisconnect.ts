//here the event starts
// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = (client: any, event: any, id: any) => {
    logger.error({ text: `[${String(new Date).split(" ", 5).join(" ")}] Shard #${id} Disconnected`});
}
