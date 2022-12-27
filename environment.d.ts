declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            DEV: 'true' | 'false';
            ANTI_CRASH: 'true' | 'false';
            COMMAND_COOLDOWN: number;
            DB_HOST: string;
            DB_USER: string;
            DB_PASS: string;
            DB_SETUP: 'true' | 'false';
            DB_NAME: string;
            EMBED_COLOR: string;
            EMBED_WRONG_COLOR: string;
            EMBED_FOOTER: string;
            EMBED_FOOTER_ICON: string;
            PREFIX: string;
            BOT_STATUS: string;
            BOT_STATUS_TYPE: string;
            BOT_OWNER: number;
        }
    }
    function client(): void;
    function logger(): void;
}



export {}