import { Message } from './message.interface';
import { Payload } from './payload.interface';

export interface ApiResponse<T extends Payload> {
	data: T;
	messages: Message[];
}
