import {Publisher, Subjects, TicketUpdatedEvent} from '@shootl/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}