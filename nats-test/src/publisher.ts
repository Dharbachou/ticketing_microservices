import nats from 'node-nats-streaming';
import {randomBytes} from "crypto";

import {TicketCreatePublisher} from "./events/ticket-create-publisher";

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
   console.log('Publisher connected to Nats');

    const publisher = new TicketCreatePublisher(stan);

    try {
        await publisher.publish({
            id: "123",
            title: "concert",
            price: 30
        });
    } catch (err) {
        console.error(err);
    }
});