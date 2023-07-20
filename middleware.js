const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs');

module.exports = function (req, res, next) {
    // Get the API key from the 'x-api-key' header
    const API_KEY = req.headers['x-api-key'];
 
    if (!API_KEY) {
        // API key is missing, respond with 400 Bad Request
        return res.status(400).send('API Key is missing');
    }

    fs.readFile(VALID_KEYS_PATH, function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }

        const validKeys = data.toString().split('\n'); // Split the file by new line
        const trimmedAPI_KEY = API_KEY.trim(); // Trim leading and trailing whitespace

        if (validKeys.includes(trimmedAPI_KEY)) {
            // API key is valid, call the next middleware
            next();
        } else {
            // Invalid API key, respond with 401 Unauthorized
            res.status(401).send('Invalid API Key');
        }
    });
};
