// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const memberRoutes = require('./routes/memberRoutes');
const voucherRoutes = require('./routes/voucherRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load API routes
app.use('/api', memberRoutes);
app.use('/api', voucherRoutes);

// Connect to the database and start the server
async function startServer() {
    try {
        await db.connect();
        app.listen(port, () => {
            console.log(`Server listening at http://0.0.0.0:${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
}

startServer();