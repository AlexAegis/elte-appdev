import { GrantedAuthority } from './granted-authority.interface';

export class User {
	username: string;
	password: string;
	id: number;
	active: boolean;
	enabled: boolean;
	authorities: Array<GrantedAuthority>;
}
