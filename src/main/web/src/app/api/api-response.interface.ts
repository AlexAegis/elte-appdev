import { Message } from './message.interface';
import { Payload } from './payload.interface';
import { Base } from '../model/base.interface';

export interface ApiResponse<T extends Payload | Base> {
	data: T;
	messages: Message[];
}
