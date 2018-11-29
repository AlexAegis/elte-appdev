import { Payload } from '../../payload.interface';
import { ApiResponse } from '../../api-response.interface';
import { User } from 'src/app/model/user.class';

const url = () => `rest/public/users/register`;
export { url };
export interface RegisterRequest extends Payload, User {}

export interface RegisterResponse extends Payload, User {}
