const socket = io();

socket.on('connect', () => {
    console.log('Connected to the server...');
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server...');
});

socket.on('newMessage', (msg) => {
    console.log('New Message: from: ' + msg.from + ' msg: ' + msg.text);
});

socket.emit('createMessage', {
    'from': 'Ronan',
    'text': 'this is Ronan'
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Got your msg');
    }
});