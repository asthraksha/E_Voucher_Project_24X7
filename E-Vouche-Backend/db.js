// db.js
const sql = require('mssql');
const config = {
    user: 'pll',
    password: 'myposadminauthentication',
    server: '69.197.150.166',
    database: '24X7_DB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

let pool;

async function connect() {
    try {
        pool = await sql.connect(config);
        console.log('Database connected successfully!');
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

function getPool() {
    if (!pool) {
        throw new Error('Database connection pool has not been established. Call connect() first.');
    }
    return pool;
}

module.exports = {
    connect,
    getPool
};