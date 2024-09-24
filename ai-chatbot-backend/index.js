require('dotenv').config();
require('./db');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '1MB' }));

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});


app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));