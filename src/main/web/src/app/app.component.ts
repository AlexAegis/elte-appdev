import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from './service/auth.service';
import {
	transition,
	animate,
	state,
	style,
	trigger,
	group,
	animateChild,
	query
} from '@angular/animations';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { slideInAnimation } from './animation/route.animation';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('expand', [
			transition('open => wideopen', [
				group([
					query('@expandReg', animateChild()),
					animate('2500ms ease')
				])
			]),
			transition('wideopen => open', [
				group([
					query('@expandReg', animateChild()),
					animate('2500ms ease')
				])
			]),
			transition('open => closed', [animate('2500ms ease')]),
			transition('closed => open', [animate('2500ms ease')]),

			state(
				'wideopen',
				style({
					height: '90vh',
					minHeight: '32em', // 16 rem
					opacity: 0.9,
					backgroundColor: 'black'
				})
			),
			state(
				'open',
				style({
					height: '50vh',
					minHeight: '16em', // 16 rem
					opacity: 0.6,
					backgroundColor: 'green'
				})
			),
			state(
				'closed',
				style({
					//height: '8vh',
					minHeight: '8vh', // 2 rem
					opacity: 1
				})
			)
		]),
		trigger('expandReg', [
			transition('open <=> wideopen', [
				group([
					query(':leave', animate('1500ms ease'), { optional: true }),
					animate('1500ms ease')
				])
			]),
			state(
				'wideopen',
				style({
					height: '80vh',
					minHeight: '1em',
					backgroundColor: 'red',
					transform: 'translateY(0)'
				})
			),
			state(
				'open',
				style({
					height: '0vh',
					minHeight: '0em',
					backgroundColor: 'aqua',
					transform: 'translateY(-100%)'
				})
			)
		]),
		trigger('expandTitle', [
			transition('* <=> *', [animate('2500ms ease')]),
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
		]),
		slideInAnimation
	]
})
export class AppComponent implements OnInit {
	title: string = 'Client';

	open: boolean = true;
	exp: boolean = true;
	constructor(public auth: AuthService, private route: ActivatedRoute) {}

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

	prepareRoute(outlet: RouterOutlet) {
		const lol =
			outlet &&
			outlet.activatedRouteData &&
			outlet.activatedRouteData['animation'];

		return lol;
	}

	navSize(forMe: string) {
		let result: string;

		result = this.auth.user === undefined ? 'open' : 'closed';
		if (
			this.route.firstChild &&
			this.route.firstChild.outlet === 'register'
		) {
			result = 'wideopen';
		}

		console.log(`saywhat ${forMe} is: ${result}`);
		return result;
	}
	animDebug(event) {
		console.log(event);
	}
}
