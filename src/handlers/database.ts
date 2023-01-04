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

function addZero(str: string | number)
{
    return str < 10 ? ('0' + str) : str;
}

async function getDate() {
    const currentdate = new Date();
    return addZero(currentdate.getFullYear()) + "-" +
        addZero(currentdate.getMonth() + 1) + "-" +
        addZero(currentdate.getDate()) + " " +
        addZero(currentdate.getHours()) + ":" +
        addZero(currentdate.getMinutes()) + ":" +
        addZero(currentdate.getSeconds());
}

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
        process.exit(1);
    }
}

async function query(query: string) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(query);
        await conn.release();
        return rows;
    } catch (err) {
        logger.error({
            text: `Error querying MariaDB:\n` + err
        });
    }
}

async function addBan(id: number, reason: string, time: string, invoker: number) {
    let conn;
    //try {
        conn = await pool.getConnection();
        const user = await conn.query(`SELECT * FROM \`users\` WHERE userid = ${id}`);
        if (user.length === 0) {
            logger.debug({
                text: `User ${id} not found in database, adding...`
            })
            await conn.query(`INSERT INTO \`users\` (userid)
                              VALUES (${id})`);
            logger.debug({
                text: `User ${id} added...`
            })
        }
        const invokeuser = await conn.query(`SELECT * FROM \`users\` WHERE userid = ${invoker}`);
        if (invokeuser.length === 0) {
            logger.debug({
                text: `User ${invoker} not found in database, adding...`
            })
            await conn.query(`INSERT INTO \`users\` (userid)
                              VALUES (${invoker})`);
            logger.debug({
                text: `User ${invoker} added...`
            })
        }
        let currdate = await getDate();
        logger.debug({
            text: currdate
        });
        const rows
            = await conn.query("INSERT INTO \`bans\` (userid, reason, until, date, invoked_by) VALUES (?, ?, ?, ?, ?)", [id, reason, time, currdate.toString(), invoker]
        );
        await conn.release();
        return rows;
    /*} catch (err) {
        logger.error({
            text: `[${String(new Date).split(" ", 5).join(" ")}] Error querying MariaDB:\n` + err
        });
    }*/
}

async function addUnban(id: number, reason: string, invoker: number) {
    let conn;
    //try {
        conn = await pool.getConnection();
        const user = await conn.query(`SELECT * FROM \`users\` WHERE userid = ${id}`);
        if (user.length === 0) {
            logger.debug({
                text: `User ${id} not found in database, adding...`
            })
            await conn.query(`INSERT INTO \`users\` (userid)
                              VALUES (${id})`);
            logger.debug({
                text: `User ${id} added...`
            })
        }
        const invokeuser = await conn.query(`SELECT * FROM \`users\` WHERE userid = ${invoker}`);
        if (invokeuser.length === 0) {
            logger.debug({
                text: `User ${invoker} not found in database, adding...`
            })
            await conn.query(`INSERT INTO \`users\` (userid)
                              VALUES (${invoker})`);
            logger.debug({
                text: `User ${invoker} added...`
            })
        }
        let currdate = await getDate();
        logger.debug({
            text: currdate
        });
        const rows
            = await conn.query("INSERT INTO \`unbans\` (userid, reason, date, invoked_by) VALUES (?, ?, ?, ?)", [id, reason, currdate.toString(), invoker]
        );
        await conn.release();
        return rows;
    /*} catch (err) {
        logger.error({
            text: `[${String(new Date).split(" ", 5).join(" ")}] Error querying MariaDB:\n` + err
        });
    }*/
}

async function addCommandUse(command: string, invoker: number, args: any) {
    let conn;
    try {
        conn = await pool.getConnection();
        const user = await conn.query(`SELECT * FROM \`users\` WHERE userid = ${invoker}`);
        if (user.length === 0) {
            logger.debug({
                text: `User ${invoker} not found in database, adding...`
            })
            await conn.query(`INSERT INTO \`users\` (userid)
                              VALUES (${invoker})`);
            logger.debug({
                text: `User ${invoker} added...`
            })
        }
        let currdate = await getDate();
        logger.debug({
            text: currdate
        });
        const rows
            = await conn.query("INSERT INTO \`command_uses\` (userid, command, date, args) VALUES (?, ?, ?, ?)", [invoker, command, currdate.toString(), args]
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
    addBan,
    addUnban,
    addCommandUse
}
