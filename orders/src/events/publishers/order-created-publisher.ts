import {Publisher, Subjects, OrderCreatedEvent} from '@shootl/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}