import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from './service/auth.service';
import { transition, animate, state, style, trigger, group } from '@angular/animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('expand', [
			//transition('* => *', [animate('500ms ease-in-out')]),
			transition('open => *', [animate('500ms ease')]),
			transition('closed => *', [animate('500ms ease')]),
			transition('small => *', [animate('500ms ease')]),
			transition('large => *', [animate('500ms ease')]),
			state(
				'open',
				style({
					height: '50vh',
					minHeight: '16em', // 16 rem
					opacity: 0.6
				})
			),
			state(
				'closed',
				style({
					//height: '8vh',
					minHeight: '8vh', // 2 rem
					opacity: 1
				})
			),
			state(
				'small',
				style({
					fontSize: '2rem',
					opacity: 1
				})
			),
			state(
				'large',
				style({
					fontSize: '10rem',
					opacity: 0.8
				})
			)
		])
	]
})
export class AppComponent implements OnInit {
	title: string = 'Client';

	open: boolean = true;
	exp: boolean = true;
	constructor(public auth: AuthService) {}

	ngOnInit(): void {}

	whoami(): any {
		console.log('whoami');
		this.auth.queryCurrentUser().subscribe(observable => {
			console.log(observable);
		});
	}

	animate(): void {
		this.open = !this.open;
		this.exp = !this.exp;
	}
}
