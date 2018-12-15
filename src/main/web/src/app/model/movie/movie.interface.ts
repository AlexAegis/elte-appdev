import { Base } from '../base.interface';
import { Actor } from '../people/actor.class';

export interface Movie extends Base {
	title: string;
	release: Date;
	actors: Array<Actor>;
}
