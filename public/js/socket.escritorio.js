var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, (respuesta) => {

        if (respuesta === 'No hay Tickets') {
            label.text(respuesta);
            alert(respuesta);
            return;
        }

        label.text(respuesta.numero);
        console.log('esta=>', respuesta);

    });

    // socket.emit('estadoActual') 

});



// socket.on('connect', () => {
//     console.log('Usuario conectado');
// });

// socket.on('disconnect', () => {
//     console.log('Usuario desconectado');
// });

// socket.on('estadoActual', (data) => {
//     label.text(data.actual);
// });