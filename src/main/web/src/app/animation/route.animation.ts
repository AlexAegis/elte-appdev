import {
	trigger,
	transition,
	style,
	animateChild,
	animate,
	query,
	group
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
	transition('* <=> *', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '66%'
			})
		]),
		query(':enter', [style({ left: '-100%' })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [
				animate('300ms ease-out', style({ left: '100%' }))
			]),
			query(':enter', [animate('300ms ease-out', style({ left: '0%' }))])
		]),
		query(':enter', animateChild())
	]) /*,
	transition('* <=> *', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ left: '-100%' })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('200ms ease-out', style({ left: '100%' }))]),
			query(':enter', [animate('300ms ease-out', style({ left: '0%' }))])
		]),
		query(':enter', animateChild())
	])*/
]);
