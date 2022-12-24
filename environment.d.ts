
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            DEV: 'true' | 'false';
            ANTI_CRASH: 'true' | 'false';
            COMMAND_COOLDOWN: number;
        }
    }
}


export {}