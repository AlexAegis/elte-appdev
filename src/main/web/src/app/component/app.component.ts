import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { transition, animate, state, style, trigger, group, animateChild, query } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInAnimation } from '../animation/route.animation';
import { AuthGuard } from '../guard/auth.guard';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('leave', [
			transition(':enter', [
				style({ transform: 'translateX(-100%)', opacity: 0 }),
				animate('200ms', style({ transform: 'translateX(0)', opacity: 1 }))
			]),
			transition(':leave', [
				style({ transform: 'translateX(0)', opacity: 1 }),
				animate('200ms', style({ transform: 'translateX(-100%)', opacity: 0 }))
			])
		]),
		trigger('expand', [
			transition('open <=> closed', [group([query('@*', animateChild()), animate('500ms ease')])]),
			state(
				'open',
				style({
					height: '50vh',
					minHeight: '32em'
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

	mediaLarge: boolean = true;

	color: string = '#00aaffff';

	@ViewChild('login')
	login: ElementRef;

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

	expandDone($event): void {
		// (<LoginComponent>this.login).loginForm.get('password').nativeElement.focus();
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
