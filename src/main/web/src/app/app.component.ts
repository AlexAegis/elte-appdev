import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { transition, animate, state, style, trigger } from '@angular/animations';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('expand', [
			transition('open => closed', [animate('500ms ease-in-out')]),
			transition('closed => open', [animate('500ms cubic-bezier(0.680, -0.550, 0.265, 1.550)')]),
			state(
				'open',
				style({
					height: '50vh',
					minHeight: '16em',
					opacity: 0.6
				})
			),
			state(
				'closed',
				style({
					height: '8vh',
					minHeight: '4em',
					opacity: 1
				})
			)
		])
	]
})
export class AppComponent implements OnInit {
	title: string = 'client';
	open: boolean = true;
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
	}
}
