import { MessageType } from './message-type.enum';

export interface Message {
	type: MessageType;
	message: string;
	target: string;
}
