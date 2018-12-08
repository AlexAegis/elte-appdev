import { Payload } from '../../payload.interface';
import { ApiResponse } from '../../api-response.interface';

const url = (username: string) => `rest/public/users/validation/available/${username}`;
export { url };
export interface UserAvailableResponse extends Payload {
	available: boolean;
}
