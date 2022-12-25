//here the event starts
// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = (client: any, error: any, id: any) => {
    logger.error({ text: `Shard #${id} Errored:\n` + error});
}
