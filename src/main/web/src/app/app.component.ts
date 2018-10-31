import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Subscription, of } from 'rxjs';
import { User } from './model/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title: string = 'client';
	isLogged: boolean;
	user: User = undefined;
	loaded: boolean = false;
	announced: string = 'not';
	subscription: Subscription;
	constructor(private userService: UserService, private authService: AuthService) {}

	ngOnInit(): void {
		this.loaded = false;
		this.user = undefined;
		this.authService
			.queryCurrentUser()
			.then(user => {
				this.user = user;
				this.loaded = true;
				console.log('loaded! normal ' + this.loaded);
			})
			.catch(e => {
				this.user = undefined;
				this.loaded = true;
				console.log('loaded! failed ' + this.loaded);
			});

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
