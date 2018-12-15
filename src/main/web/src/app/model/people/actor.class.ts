import { Base } from './../base.interface';
import { Person } from './person.class';

export interface Actor extends Base {
	person: Person;
}
