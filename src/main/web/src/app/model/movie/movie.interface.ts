import { Base } from '../base.interface';

export interface Movie extends Base {
	name: string;
	release: Date;
}
