import nats from 'node-nats-streaming';
import {randomBytes} from "crypto";

import {closeProcess} from "./utils/closeProcess";

import TicketCreatedListener from "./events/ticket-created-listener";

console.clear();
console.log('Client application starting');

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: "http://localhost:4222"
});

stan.on('connect', () => {
    console.log('Nats connected');

    stan.on('close', () => {
        console.log('Nats connection closed');
        process.exit();
    });

    new TicketCreatedListener(stan).listen();
});


closeProcess(stan.close.bind(stan));