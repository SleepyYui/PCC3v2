//here the event starts
// @ts-ignore
const logger = require("../../handlers/logger");
module.exports = (client: any, rateLimitData: { method: any; path: any; }) => {
    logger.super_error(`${rateLimitData.method} ${rateLimitData.path}`, `${rateLimitData}`);
}
