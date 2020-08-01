// const Data = require('./data');
const fs = require('fs');

class Data {
    constructor(ultimo, hoy, tickets, ultimos4) {
        this.ultimo = ultimo;
        this.hoy = hoy;
        this.tickets = tickets;
        this.ultimos4 = ultimos4;
    }
}

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets || [];
            this.ultimos4 = data.ultimos4 || [];

        } else {
            this.reiniciarConteo();
            console.log('Se ha reinicializado el Sistema');
        }

    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay Tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);


        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // borra el último
        }

        // console.log('Ultimos 4 => ', this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha inicializado el Sistema');
    }

    grabarArchivo() {
        let data = new Data(this.ultimo, this.hoy, this.tickets, this.ultimos4);
        let jsonDataString = JSON.stringify(data);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}



module.exports = {
    TicketControl
};