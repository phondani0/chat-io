const socketIO = require('socket.io');

const {
    generateMsg
} = require('./message');

module.exports = function (server) {

    const io = socketIO(server);

    io.on('connection', socket => {
        console.log('New user connected...');

        socket.emit('newMessage', generateMsg('Admin', 'Welcome to Chat-io'));

        socket.broadcast.emit('newMessage', generateMsg('admin', 'New user joined Chat-io'));

        socket.on('createMessage', (msg, callback) => {
            console.log('createMessage: from: ' + msg.from + ' msg: ' + msg.text);
            io.emit('newMessage', generateMsg(msg.from, msg.text));
            callback(null);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected...');
        });
    });
}