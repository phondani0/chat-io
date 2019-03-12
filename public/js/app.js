const socket = io();

socket.on('connect', () => {
    console.log('Connected to the server...');
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server...');
});

socket.on('newMessage', (msg) => {
    console.log(msg.text + ' from:- ' + msg.from);
    const li = $('<li></li>');
    $(li).html(`<b>${msg.from}</b>: ${msg.text}`);
    $('#msg-list').append(li);
});


$('#msg-form').on('submit', (e) => {
    e.preventDefault();

    const msg = {
        'from': $('[name="name"]').val(),
        'text': $('[name="message"]').val()
    }
    console.log(msg);
    socket.emit('createMessage', msg, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Got your msg');
        }
    });

});