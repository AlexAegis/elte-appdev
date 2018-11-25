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
			transition('* <=> *', [
				group([query('@*', animateChild()), animate('500ms ease')])
			]),
			state(
				'wideopen',
				style({
					height: '90vh',
					minHeight: '32em' // 16 rem
					//transform: 'translateY(-10%)'
					// backgroundColor:4 'black'
				})
			),
			state(
				'open',
				style({
					height: '50vh',
					minHeight: '32em' // 16 rem
					// backgroundColor: 'green'
				})
			),
			state('closed', style({}))
		]),
		trigger('expandMain', [
			transition('* <=> *', [group([animate('500ms ease')])]),
			state(
				'wideopen',
				style({
					transform: 'translateY(100vh)'
				})
			),
			state(
				'open',
				style({
					transform: 'translateY(0)'
				})
			)
		]),
		trigger('expandReg', [
			transition('* <=> *', [
				group([
					query(':leave', animate('500ms ease'), { optional: true }),
					animate('500ms ease')
				])
			]),
			state(
				'wideopen',
				style({
					//height: '80vh',
					//minHeight: '1em',
					// backgroundColor: 'red',
					transform: 'translateY(0)'
				})
			),
			state(
				'open',
				style({
					//height: '0vh',
					//minHeight: '0em',
					// backgroundColor: 'aqua',
					transform: 'translateY(-100vh)'
				})
			)
		]),
		trigger('expandTitle', [
			transition('* <=> *', [animate('500ms ease')]),
			state(
				'closed',
				style({
					fontSize: '2rem',
					opacity: 1
				})
			),
			state(
				'open',
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
	title: string = 'Cinema';

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

	navSize() {
		return this.auth.user === undefined
			? this.route.firstChild &&
			  this.route.firstChild.outlet === 'register'
				? 'wideopen'
				: 'open'
			: 'closed';
	}
	animDebug(event) {
		console.log(event);
	}
}
