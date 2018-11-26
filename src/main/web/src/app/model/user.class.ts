import { GrantedAuthority } from './granted-authority.interface';
import { Person } from './people/person.class';
import { Named } from './people/named.interface';
import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson-fork';

@jsonObject
export class User implements Named {
	@jsonMember
	username: string;
	password: string;
	id: number;
	@jsonMember
	person: Person = new Person();
	active: boolean;
	enabled: boolean;
	authorities: Array<GrantedAuthority>;

	name(): string {
		if (this.person) {
			return this.person.name();
		} else {
			return this.username;
		}
	}
}
