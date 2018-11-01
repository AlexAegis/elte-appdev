import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Subscription, of, Observable, from } from 'rxjs';
import { User } from './model/user';
import { shareReplay } from 'rxjs/operators';

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
		this.user$ = from(this.authService.queryCurrentUser()).pipe(shareReplay(1));
		this.user$.subscribe(user => {
			this.user = user;
		});

		this.subscription = this.authService.loggedInAnnounced.subscribe(user => {
			this.user = user;
		});
	}

	ngOnDestroy() {
		// prevent memory leak when component destroyed
		this.subscription.unsubscribe();
	}

	public isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}
}
