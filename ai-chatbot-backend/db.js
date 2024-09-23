require('dotenv').config();

const { createPool } = require('mysql2');

const db = createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

(async () => {
    try {
        await db.query('SELECT 1');
        console.log('Successfully connected to MySQL database');
    } catch (err) {
        console.error('Error connecting to MySQL database:', err);
    }
})();

module.exports = db;