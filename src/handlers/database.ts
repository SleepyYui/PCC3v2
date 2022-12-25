const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// @ts-ignore
const logger = require("../handlers/logger");
// @ts-ignore
const fs = require('fs');

async function initialisation() {
    let conn;
    logger.db({
        text: `Initialising database...`
    })
    try {
        logger.db({
            text: `Getting connection...`
        })
        conn = await pool.getConnection();
        let query: string
        if (process.env.DB_SETUP === "true") {
            query = fs.readFileSync('./src/db/setup.sql').toString();
        } else {
            query = "SELECT * FROM bans";
        }
        logger.db({
            text: `Testing connection...`
        })
        const rows = await conn.query(query);
        logger.debug({
            text: rows
        })
        logger.db({
            text: `Connected to database successfully!`
        });
        await conn.release();
        return conn;
    } catch (err) {
        logger.error({
            text: `Error connecting to database:\n` + err
        });
    }
}

async function query(query: string) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows
            = await conn.query(query
        );
        await conn.release();
        return rows;
    } catch (err) {
        logger.error({
            text: `Error querying MariaDB:\n` + err
        });
    }
}

async function addban(id: number, reason: string, time: string) {
    let conn;
    try {
        conn = await pool.getConnection();
        const user = await conn.query(`SELECT * FROM \`users\` WHERE userid = '${id}'`);
        if (user.length === 0) {
            await conn.query(`INSERT INTO \`users\` (userid) VALUES ('${id}')`);
        }
        const rows
            = await conn.query("INSERT INTO bans (userid, reason, until) VALUES (?, ?, ?)", [id, reason, time]
        );
        await conn.release();
        return rows;
    } catch (err) {
        logger.error({
            text: `[${String(new Date).split(" ", 5).join(" ")}] Error querying MariaDB:\n` + err
        });
    }
}

module.exports = {
    initialisation,
    query,
    addban
}
