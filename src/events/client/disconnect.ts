//here the event starts
// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = () => {
    logger.info({ text: `Disconnected at ${new Date()}.`});
}

