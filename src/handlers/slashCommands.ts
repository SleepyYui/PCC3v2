// @ts-ignore
const { readdirSync, lstatSync } = require("fs");
const { SlashCommandBuilder } = require('@discordjs/builders');
// @ts-ignore
const config = require("../botconfig/config.json");
// @ts-ignore
const logger = require("./logger");
const dirSetup = config.slashCommandsDirs;
module.exports = (client: { slashCommands: { set: (arg0: string, arg1: any) => void; }; on: (arg0: string, arg1: (guild: any) => void) => void; application: { commands: { set: (arg0: any[]) => Promise<any>; }; }; guilds: { cache: any[]; }; }) => {
    //try {
        let allCommands: any[] = [];
        readdirSync("./src/slashCommands/").forEach((dir: any) => {
            if(lstatSync(`./src/slashCommands/${dir}`).isDirectory()) {
                const cmdSetup = dirSetup.find((d: { Folder: any; })=>d.Folder == dir);
                //If its a valid cmd setup
                if(cmdSetup && cmdSetup.Folder) {
                    //Set the SubCommand as a Slash Builder
                    const subCommand = new SlashCommandBuilder().setName(String(cmdSetup.CmdName).replace(/\s+/g, '_').toLowerCase()).setDescription(String(cmdSetup.CmdDescription))//.setDefaultMemberPermissions(cmdSetup.activeByDefault);
                    //Now for each file in that subcommand, add a command!
                    const slashCommands = readdirSync(`./src/slashCommands/${dir}/`).filter((file: string) => file.endsWith(".ts"));
                    for (let file of slashCommands) {
                        let pull = require(`../slashCommands/${dir}/${file}`);
                        if (pull.name && pull.description) {
                            subCommand
                                .addSubcommand((subcommand: { setName: (arg0: string) => { (): any; new(): any; setDescription: { (arg0: any): void; new(): any; }; }; addUserOption: (arg0: (op: any) => any) => void; addIntegerOption: (arg0: (op: any) => any) => void; addStringOption: (arg0: { (op: any): any; (op: any): any; (op: any): any; }) => void; addChannelOption: (arg0: (op: any) => any) => void; addRoleOption: (arg0: (op: any) => any) => void; }) => {
                                    subcommand.setName(String(pull.name).toLowerCase()).setDescription(pull.description)
                                    if(pull.options && pull.options.length > 0){
                                        for(const option of pull.options){
                                            if(option.User && option.User.name && option.User.description){
                                                subcommand.addUserOption((op) =>
                                                    op.setName(String(option.User.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.User.description).setRequired(option.User.required)
                                                )
                                            } else if(option.Integer && option.Integer.name && option.Integer.description){
                                                subcommand.addIntegerOption((op) =>
                                                    op.setName(String(option.Integer.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Integer.description).setRequired(option.Integer.required)
                                                )
                                            } else if(option.String && option.String.name && option.String.description){
                                                subcommand.addStringOption((op) =>
                                                    op.setName(String(option.String.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.String.description).setRequired(option.String.required)
                                                )
                                            } else if(option.Channel && option.Channel.name && option.Channel.description){
                                                subcommand.addChannelOption((op) =>
                                                    op.setName(String(option.Channel.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Channel.description).setRequired(option.Channel.required)
                                                )
                                            } else if(option.Role && option.Role.name && option.Role.description){
                                                subcommand.addRoleOption((op) =>
                                                    op.setName(String(option.Role.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Role.description).setRequired(option.Role.required)
                                                )
                                            } else if(option.StringChoices && option.StringChoices.name && option.StringChoices.description && option.StringChoices.choices && option.StringChoices.choices.length > 0){
                                                subcommand.addStringOption((op) =>
                                                    op.setName(String(option.StringChoices.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.StringChoices.description).setRequired(option.StringChoices.required)
                                                        .addChoices(option.StringChoices.choices.map((c: any[])=> [String(c[0]).replace(/\s+/g, '_').toLowerCase(),String(c[1])] )),
                                                )
                                            } else if(option.IntChoices && option.IntChoices.name && option.IntChoices.description && option.IntChoices.choices && option.IntChoices.choices.length > 0){
                                                subcommand.addStringOption((op) =>
                                                    op.setName(String(option.IntChoices.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.IntChoices.description).setRequired(option.IntChoices.required)
                                                        .addChoices(option.IntChoices.choices.map((c: string[])=> [String(c[0]).replace(/\s+/g, '_').toLowerCase(),parseInt(c[1])] )),
                                                )
                                            } else {
                                                logger.warn({ text: `A Option is missing the Name and/or the Description of ${pull.name}`});
                                            }
                                        }
                                    }
                                    return subcommand;
                                })
                            logger.debug({ text: pull});
                            client.slashCommands.set(String(cmdSetup.CmdName).replace(/\s+/g, '_').toLowerCase() + pull.name, pull)
                        } else {
                            logger.error({ text: `Missing a help.name, or help.name is not a string.\n` + file});
                        }
                    }
                    //add the subcommand to the array
                    allCommands.push(subCommand.toJSON());
                }
                else {
                    return logger.info({ text: `The Subcommand-Folder "${dir}" is not in the dirSetup configuration! You can set it in /src/botconfig/config.json`});
                }
            } else {
                let pull = require(`../slashCommands/${dir}`);
                if (pull.name && pull.description) {
                    let Command = new SlashCommandBuilder().setName(String(pull.name).toLowerCase()).setDescription(pull.description).setDefaultMemberPermissions(pull.memberpermissions).setDMPermission(pull.dmpermission).setCooldown(pull.cooldown);
                    if(pull.options && pull.options.length > 0){
                        for(const option of pull.options){
                            if(option.User && option.User.name && option.User.description){
                                Command.addUserOption((op: { setName: (arg0: string) => { (): any; new(): any; setDescription: { (arg0: any): { (): any; new(): any; setRequired: { (arg0: any): any; new(): any; }; }; new(): any; }; }; }) =>
                                    op.setName(String(option.User.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.User.description).setRequired(option.User.required)
                                )
                            } else if(option.Integer && option.Integer.name && option.Integer.description){
                                Command.addIntegerOption((op: { setName: (arg0: string) => { (): any; new(): any; setDescription: { (arg0: any): { (): any; new(): any; setRequired: { (arg0: any): any; new(): any; }; }; new(): any; }; }; }) =>
                                    op.setName(String(option.Integer.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Integer.description).setRequired(option.Integer.required)
                                )
                            } else if(option.String && option.String.name && option.String.description){
                                Command.addStringOption((op: { setName: (arg0: string) => { (): any; new(): any; setDescription: { (arg0: any): { (): any; new(): any; setRequired: { (arg0: any): any; new(): any; }; }; new(): any; }; }; }) =>
                                    op.setName(String(option.String.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.String.description).setRequired(option.String.required)
                                )
                            } else if(option.Channel && option.Channel.name && option.Channel.description){
                                Command.addChannelOption((op: { setName: (arg0: string) => { (): any; new(): any; setDescription: { (arg0: any): { (): any; new(): any; setRequired: { (arg0: any): any; new(): any; }; }; new(): any; }; }; }) =>
                                    op.setName(String(option.Channel.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Channel.description).setRequired(option.Channel.required)
                                )
                            } else if(option.Role && option.Role.name && option.Role.description){
                                Command.addRoleOption((op: { setName: (arg0: string) => { (): any; new(): any; setDescription: { (arg0: any): { (): any; new(): any; setRequired: { (arg0: any): any; new(): any; }; }; new(): any; }; }; }) =>
                                    op.setName(String(option.Role.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Role.description).setRequired(option.Role.required)
                                )
                            } else if(option.StringChoices && option.StringChoices.name && option.StringChoices.description && option.StringChoices.choices && option.StringChoices.choices.length > 0){
                                Command.addStringOption((op: { setName: (arg0: string) => { (): any; new(): any; setDescription: { (arg0: any): { (): any; new(): any; setRequired: { (arg0: any): { (): any; new(): any; addChoices: { (arg0: any): any; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) =>
                                    op.setName(String(option.StringChoices.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.StringChoices.description).setRequired(option.StringChoices.required)
                                        .addChoices(option.StringChoices.choices.map((c: any[])=> [String(c[0]).replace(/\s+/g, '_').toLowerCase(),String(c[1])] )),
                                )
                            } else if(option.IntChoices && option.IntChoices.name && option.IntChoices.description && option.IntChoices.choices && option.IntChoices.choices.length > 0){
                                Command.addStringOption((op: { setName: (arg0: string) => { (): any; new(): any; setDescription: { (arg0: any): { (): any; new(): any; setRequired: { (arg0: any): { (): any; new(): any; addChoices: { (arg0: any): any; new(): any; }; }; new(): any; }; }; new(): any; }; }; }) =>
                                    op.setName(String(option.IntChoices.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.IntChoices.description).setRequired(option.IntChoices.required)
                                        .addChoices(option.IntChoices.choices.map((c: string[])=> [String(c[0]).replace(/\s+/g, '_').toLowerCase(),parseInt(c[1])] )),
                                )
                            } else {
                                logger.error({ text: `A Option is missing the Name and/or the Description of ${pull.name}`});
                            }
                        }
                    }
                    allCommands.push(Command.toJSON());
                    client.slashCommands.set("normal" + pull.name, pull)
                }
                else {
                    logger.error({ text: `Missing a help.name, or help.name is not a string.`});
                }
            }
        });

        //Once the Bot is ready, add all Slas Commands to each guild
        client.on("ready", () => {
            if (process.env.DEV === "false") {
                client.application.commands.set(allCommands)
                    .then(slashCommandsData => {
                        // @ts-ignore
                        logger.info({text: `${slashCommandsData.size} slashCommands (With ${slashCommandsData.map((d: { options: any; }) => d.options).flat().length} Subcommands) Loaded for ${client.guilds.cache.size} guilds.`});
                    }).catch((e) => logger.error({text: e}));
            } else {
                logger.debug({text: allCommands});
                logger.debug({text: allCommands[0].options});
                logger.debug({text: allCommands[0].options[0].options});
                client.guilds.cache.map(g => g).forEach((guild) => {
                    try {
                        guild.commands.set(allCommands)
                            .then((slashCommandsData: { size: any; map: (arg0: (d: any) => any) => { (): any; new(): any; flat: { (): { (): any; new(): any; length: any; }; new(): any; }; }; }) => {
                                logger.info({text: `${slashCommandsData.size} slashCommands (With ${slashCommandsData.map(d => d.options).flat().length} Subcommands) Loaded for ${guild.name}.`});
                            }).catch((e: any) => logger.error({text: e}));
                    } catch (e) {
                        logger.debug({text: "Line 143 | slashCommands.ts"});
                        logger.error({text: e});
                    }
                });
            }
        })
        //DISABLE WHEN USING GLOBAL!
        client.on("guildCreate", (guild) => {
            try{
                if(process.env.DEV === "true") {
                    guild.commands.set(allCommands)
                        .then((slashCommandsData: { size: any; map: (arg0: (d: any) => any) => { (): any; new(): any; flat: { (): { (): any; new(): any; length: any; }; new(): any; }; }; }) => {
                            logger.info({ text: `${slashCommandsData.size} slashCommands (With ${slashCommandsData.map(d => d.options).flat().length} Subcommands) Loaded for ${guild.name}.`});
                        }).catch((e: any) => logger.error({ text: e}));
                }
            }catch (e){
                logger.debug({text: "Line 159 | slashCommands.ts"});
                logger.error({ text: e});
            }
        })

    /*} catch (e) {
        logger.debug({text: "Line 165 | slashCommands.ts"});
        logger.error({ text: e});
    }*/
};
