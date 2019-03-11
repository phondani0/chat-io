const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname + '/../public');

const {
    generateMsg
} = require('./utils/message');

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

const io = socketIO(server);

io.on('connection', socket => {
    console.log('New user connected...');

    socket.emit('newMessage', generateMsg('admin', 'Welcome to chat-io'));

    socket.broadcast.emit('newMessage', generateMsg('admin', 'New User Joined chat-io'));

    socket.on('createMessage', (msg) => {
        console.log('createMessage: from: ' + msg.from + ' msg: ' + msg.text);
        io.emit('newMessage', generateMsg(msg.from, msg.text));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected...');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err.message}`);
    } else {
        console.log(`Server started at port ${port}`);
    }
});