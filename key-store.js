const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs');
const shortid = require('shortid');
const LINE_ENDING = require('os').EOL;

module.exports = function (req, res) {
    //generate a unique API KEY
    const API_KEY = shortid.generate();

    //append the key to the file
    fs.appendFile(VALID_KEYS_PATH, API_KEY + LINE_ENDING, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send('Error generating key');
        } else {
            res.status(201).send({'apikey': API_KEY});
        }
    });
};
