// @ts-ignore
const { readdirSync } = require("fs");
// @ts-ignore
const logger = require('./logger');

module.exports = (client: { commands: { set: (arg0: any, arg1: any) => void; }; aliases: { set: (arg0: any, arg1: any) => any; }; }) => {
    try {
        let amount = 0;
        readdirSync("./src/commands/").forEach((dir: any) => {
            const commands = readdirSync(`./src/commands/${dir}/`).filter((file: string) => file.endsWith(".ts"));
            for (let file of commands) {
                let pull = require(`../commands/${dir}/${file}`);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    amount++;
                } else {
                    logger.warn({ text: `Missing a help.name, or help.name is not a string.\n${file}`});
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias: any) => client.aliases.set(alias, pull.name));
            }
        });
        logger.info({ text: `Loaded ${amount} commands.`});
    } catch (e) {
        logger.error({ text: e});
    }
};
