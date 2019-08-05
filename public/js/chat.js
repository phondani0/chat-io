const socket = io();

socket.on('connect', () => {
    console.log('Connected to the server...');

    $('#join-room').on('submit', (e) => {
        e.preventDefault();

        const params = {
            username: $('#join-room #username').val(),
            room: $('#join-room #room').val()
        }
        console.log(params);
        socket.emit('join', params, (err) => {
            if (!err) {
                console.log('no err');
                window.location.href = '\chat.html'
            }
        })
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server...');
});


socket.on('newMessage', (msg) => {
    console.log(msg.text + ' from:- ' + msg.from);

    const li = $('<li></li>');
    $(li).html(`<b>${msg.from}</b>: ${msg.text}`);
    $('#messages').append(li);
    scrollToBottom();
});

$(document).ready(function () {
    $('#msg-form').on('submit', (e) => {
        e.preventDefault();

        const msg = {
            'from': $('[name="name"]').val(),
            'text': $('[name="new-msg"]').val()
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
});

function scrollToBottom() {
    const clientHeight = $('#messages').prop('clientHeight');
    const scrollHeight = $('#messages').prop('scrollHeight');
    const scrollTop = $('#messages').prop('scrollTop');
    const newMessageHeight = $('#messages li:last-child').innerHeight();
    const lastMessageHeight = $('#messages li:last-child').prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        $('#messages').scrollTop(scrollHeight);
    }
};