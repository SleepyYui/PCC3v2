//here the event starts
// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = (client: { logger: { info: (arg0: { text: string; }) => void; }; }) => {
    logger.info({ text: `Reconnecting at ${new Date()}.`});
}
