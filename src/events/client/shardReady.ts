//here the event starts
// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = (client: any, id: any) => {
    logger.info({ text: `[${String(new Date).split(" ", 5).join(" ")}] Shard #${id} Ready`});
}
