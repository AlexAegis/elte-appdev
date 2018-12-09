import { Base } from '../base.interface';

export interface Movie extends Base {
	title: string;
	release: Date;
}
