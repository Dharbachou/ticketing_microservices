import {Publisher, Subjects, OrderCancelledEvent} from '@shootl/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}