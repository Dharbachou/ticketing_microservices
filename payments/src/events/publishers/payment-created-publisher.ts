import {PaymentCreatedEvent, Publisher, Subjects} from "@shootl/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}