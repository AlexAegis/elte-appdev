import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Subscription, of, Observable, from } from 'rxjs';
import { User } from './model/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title: string = 'client';
	isLogged: boolean;
	user$: Observable<User>;
	user: User = undefined;
	announced: string = 'not';
	subscription: Subscription;
	constructor(private userService: UserService, private authService: AuthService) {}

	ngOnInit(): void {
		this.user = undefined;
		this.user$ = from(this.authService.queryCurrentUser());
		this.user$.subscribe(
			user => {
				this.user = user;
			},
			e => {
				this.user = undefined;
			}
		);

		/*
		this.authService.queryCurrentUser().then(user => {
			this.user = user;
		});*/
		this.subscription = this.authService.loggedInAnnounced.subscribe(user => {
			console.log('login announced: ' + user);
			this.user = user;
			this.announced = 'ANNOUNCED';
			// this.loadeded = true; // dont enable this because this runs immediatley
		});
	}

	ngOnDestroy() {
		console.log('deleted app');
		// prevent memory leak when component destroyed
		this.subscription.unsubscribe();
	}

	public isLoggedIn(): boolean {
		console.log('yikes');
		return this.authService.isLoggedIn();
	}
}
