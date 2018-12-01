import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { transition, animate, state, style, trigger, group, animateChild, query } from '@angular/animations';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { slideInAnimation } from '../animation/route.animation';
import { AuthGuard } from '../guard/auth.guard';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('expand', [
			transition('open <=> closed', [group([query('@*', animateChild()), animate('500ms ease')])]),
			state(
				'open',
				style({
					height: '50vh',
					minHeight: '32em' // 16 rem
					// backgroundColor: 'green'
				})
			),
			state(
				'closed',
				style({
					height: '4rem'
				})
			)
		]),
		trigger('translateLogin', [
			transition('open <=> closed', [
				group([query(':leave', animate('500ms ease'), { optional: true }), animate('500ms ease')])
			]),
			state(
				'open',
				style({
					transform: 'translateY(0vh)'
				})
			),
			state(
				'closed',
				style({
					transform: 'translateY(40rem)'
				})
			)
		]),
		trigger('expandTitle', [
			transition('closed <=> open', [animate('500ms ease')]),
			state(
				'closed',
				style({
					maxHeight: '1rem',
					height: '1rem',
					fontSize: '7em',
					opacity: 0.2
				})
			),
			state(
				'open',
				style({
					maxHeight: '4rem',
					height: '4rem',
					fontSize: '10em',
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
	show: boolean = true;

	mediaLarge: boolean;

	constructor(
		public auth: AuthService,
		public route: ActivatedRoute,
		public router: Router,
		public authGuard: AuthGuard,
		private media: ObservableMedia
	) {}

	ngOnInit(): void {
		this.media.subscribe((change: MediaChange) => {
			if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
				this.mediaLarge = false;
			} else {
				this.mediaLarge = true;
			}
		});
	}

	navSize() {
		return this.auth.user === undefined && this.router.url !== '/register' ? 'open' : 'closed';
	}

	nav() {
		this.router.navigate(['']).then(b => {
			console.log('hejja hejj' + b);
		});
	}

	animDebug(event) {
		console.log(event);
	}
}
