import {Message} from "node-nats-streaming";

import {OrderCancelledEvent, OrderStatus} from "@shootl/common";

import {natsWrapper} from "../../../nats/nats-wrapper";
import {OrderCancelledListener} from "../order-cancelled-listener";
import {Ticket} from "../../../models/ticket";
import mongoose from "mongoose";


const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);

    // Generate orderId
    const orderId = mongoose.Types.ObjectId().toHexString();

    // Create and save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 77,
        userId: 'asdf',
    });
    ticket.set({orderId});
    await ticket.save();

    // Create the fake data event
    const data: OrderCancelledEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        ticket: {
            id: ticket.id,
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, ticket, data, msg, orderId};
};

it('updates the ticket, publishes an event, and acks the message', async () => {
    const {listener, ticket, data, msg, orderId} = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).not.toBeDefined();
});

it('ack the message', async () => {
    const {listener, data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
    const {listener, data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});