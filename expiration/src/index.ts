import {natsWrapper} from './nats/nats-wrapper'
import {closeProcessListener} from "@shootl/common";
import {OrderCreatedListener} from "./events/listeners/order-created-listener";

const start = async () => {
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsWrapper.client.on('close', () => {
            console.log('Nats connection has been closed.');
            process.exit();
        });
        closeProcessListener(natsWrapper.client.close.bind(natsWrapper.client));

        new OrderCreatedListener(natsWrapper.client).listen();

    } catch (e) {
        console.error(e);
    }
};

start();


