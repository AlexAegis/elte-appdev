import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { User } from './model/user';
import { TouchSequence } from 'selenium-webdriver';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title: string = 'client';
	isLogged: boolean;
	userA: Promise<User>;
	user: User = undefined;
	loadeded: boolean = false;
	announced: string = 'not';
	subscription: Subscription;
	constructor(private userService: UserService, private authService: AuthService) {}

	ngOnInit(): void {
		console.log('loaded? ' + this.loadeded);
		this.loadeded = false;
		this.user = undefined;
		this.userA = this.authService.queryCurrentUser();
		this.authService
			.queryCurrentUser()
			.then(user => {
				this.user = user;
				this.loadeded = true;
				console.log('loaded! normal ' + this.loadeded);
			})
			.catch(e => {
				this.user = undefined;
				this.loadeded = true;
				console.log('loaded! vatch ' + this.loadeded);
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
