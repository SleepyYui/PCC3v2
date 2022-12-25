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
        }
    }
    function database(): void;
    function client(): void;
    function logger(): void;
}



export {}