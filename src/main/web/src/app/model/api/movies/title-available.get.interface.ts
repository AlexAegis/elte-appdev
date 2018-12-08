import { Payload } from '../payload.interface';

const url = (id: number) => `rest/movies/validation/available/${id}`;
export { url };
export interface TitleAvailableResponse extends Payload {
	available: boolean;
}
