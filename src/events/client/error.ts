//here the event starts
// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = (client: any, error: any) => {
    logger.error(`${error}`);
}
