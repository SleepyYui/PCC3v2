import * as events from "events";

const logger = require('./handlers/logger.ts');

// discord imports
const { Client, GatewayIntentBits, Collection } = require('discord.js');

// creating client
logger.startup({text: 'Creating client...'});
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        //GatewayIntentBits.DirectMessageTyping,
        //GatewayIntentBits.GuildScheduledEvents,
        //GatewayIntentBits.AutoModerationConfigurations,
        //GatewayIntentBits.AutoModerationExecution,

    ],
    /*makeCache: discord.Options.cacheWithLimits({
        makeCache: Options.cacheWithLimits({
            ...Options.DefaultMakeCacheSettings,
            ReactionManager: 0,
            GuildMemberManager: {
                maxSize: 512,
                //keepOverLimit: member => member.id === client.user.id,
            }
        }),
        ApplicationCommandManager: undefined,
        AutoModerationRuleManager: undefined,
        BaseGuildEmojiManager: undefined,
        GuildBanManager: undefined,
        GuildEmojiManager: undefined,
        GuildForumThreadManager: undefined,
        GuildInviteManager: undefined,
        GuildMemberManager: undefined,
        GuildScheduledEventManager: undefined,
        GuildStickerManager: undefined,
        GuildTextThreadManager: undefined,
        MessageManager: undefined,
        PresenceManager: undefined,
        ReactionManager: undefined,
        ReactionUserManager: undefined,
        StageInstanceManager: undefined,
        ThreadManager: undefined,
        ThreadMemberManager: undefined,
        UserManager: undefined,
        VoiceStateManager: undefined
    }),*/
});

// client collections
logger.startup({text: 'Creating global collections...'});
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();

// enabling handlers
logger.startup({text: 'Requiring Handlers and Anti-Crash methods...'});
["events", "commands", "slashCommands", process.env.ANTI_CRASH === 'true' ? "antiCrash" : null]
    .filter(Boolean)
    .forEach((handler: any) => {
        const handlerModule = require(`./handlers/${handler}.ts`);
        handlerModule(client);
    });

const loggedin = client.login(process.env.TOKEN);