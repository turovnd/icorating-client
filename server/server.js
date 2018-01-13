require('dotenv').config();
const path          = require('path');
const express       = require('express');
const bodyParser    = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'fase'}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log("Server Ready! Site: " + process.env.SITE + ":" + process.env.PORT);
});