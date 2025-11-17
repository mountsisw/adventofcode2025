require('dotenv/config');
const express = require('express');

// Create an express app
const app = express();

/**
 ** Endpoint for http requests
 */
app.get('/aoc2025', async function (req, res)
{
    console.log("Got route?");
});

// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Listening on port', PORT); });
