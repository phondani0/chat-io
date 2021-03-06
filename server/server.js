const express = require('express');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname + '/../public');

const app = express();

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile('index');
});

app.use((err, req, res, next) => {
    if (err) {
        console.log(err.message);
        return res.status(500).send();
    }
});

const server = http.createServer(app);

// Import socket module
require('./utils/socket')(server);

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err.message}`);
    } else {
        console.log(`Server started at port ${port}`);
    }
});