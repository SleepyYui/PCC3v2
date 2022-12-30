// @ts-ignore
const logger = require('./logger.ts');

module.exports = (client: any) => {
    try {
        const stringlength = 69;
        logger.cmsg({ text: ""});
        logger.cmsg({ text: `     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`});
        logger.cmsg({ text: `     ┃ ` + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃"});
        logger.cmsg({ text: `     ┃ ` + `YEHv2` + " ".repeat(-1 + stringlength - ` ┃ `.length - `YEHv2`.length) + "┃"});
        logger.cmsg({ text: `     ┃ ` + `Yui's Error Handler was loaded successfully` + " ".repeat(-1 + stringlength - ` ┃ `.length - `Yui's Error Handler was loaded successfully`.length) + "┃"});
        logger.cmsg({ text: `     ┃ ` + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃"});
        logger.cmsg({ text: `     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`});
        logger.cmsg({ text: ""});
    } catch(e) { logger.error({ text: e}) }

    process.on('uncaughtException', (err: any, origin) => {
        logger.fatalError({err: err, value: 'uncaughtException', origin: origin});
    });
    process.on('unhandledRejection', (err: any, origin) => {
        logger.fatalError({err: err, value: 'unhandledRejection', origin: origin});
    });
    process.on('uncaughtExceptionMonitor', (err: any, origin) => {
        logger.fatalError({err: err, value: 'uncaughtExceptionMonitor', origin: origin});
    });
};