import { Named } from './named.interface';
import { jsonObject, jsonMember } from 'typedjson-fork';

@jsonObject
export class Person implements Named {
	@jsonMember
	firstName: string;
	@jsonMember
	lastName: string;

	name(): string {
		return this.firstName + ' ' + this.lastName;
	}
}
