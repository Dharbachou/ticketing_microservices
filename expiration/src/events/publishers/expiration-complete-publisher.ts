import {ExpirationCompleteEvent, Publisher, Subjects} from "@shootl/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}