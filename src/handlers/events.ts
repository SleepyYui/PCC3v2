const fs = require("fs");
// @ts-ignore
const logger = require("./logger");
const allevents = [];

module.exports = async (client: any) => {
    //try {
        let amount = 0;
        const load_dir = (dir: any) => {
            const event_files = fs.readdirSync(`./src/events/${dir}`).filter((file: string) => file.endsWith(".ts"));
            for (const file of event_files) {
                //try {
                    const event = require(`../events/${dir}/${file}`)
                    let eventName = file.split(".")[0];
                    allevents.push(eventName);
                    client.on(eventName, event.bind(null, client));
                    amount++;
                /*} catch (e) {
                    logger.error(e);
                }*/
            }
        }
        ["client", "guild"].forEach(e => load_dir(e));
        logger.info({ text: `Loaded ${amount} events.`});

    /*} catch (e) {
        logger.error(e);
    }*/
};
