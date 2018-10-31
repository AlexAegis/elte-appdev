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
	user: User;
	announced: string = 'not';
	subscription: Subscription;
	constructor(private userService: UserService, private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.queryCurrentUser().then(user => {
			this.user = user;
		});
		this.subscription = this.authService.loggedInAnnounced.subscribe(user => {
			console.log('login announced: ' + user);
			this.user = user;
			this.announced = 'ANNOUNCED';
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
