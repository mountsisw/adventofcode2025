require('dotenv/config');
const express = require('express');
const path = require('path');

// Create an express app
const app = express();

/**
 ** Endpoint for http requests
 */
app.use(express.static(__dirname));
app.get('/aoc2025', async function (req, res)
{
    res.sendFile(path.join(__dirname, 'aoc2025.html'));
});

// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Listening on port', PORT); });
