// const { io } = require('');

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Usuario conectado');
});

socket.on('disconnect', () => {
    console.log('Usuario desconectado');
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});

socket.on('estadoActual', (data) => {
    label.text(data.actual);
});