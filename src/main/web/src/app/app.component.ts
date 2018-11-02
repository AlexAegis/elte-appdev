import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription, of, Observable, from } from 'rxjs';
import { User } from './model/user.interface';
import { shareReplay } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from './model/login-response.interface';
import { TokenPayload } from './model/token-payload.interface';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title: string = 'client';
	isLogged: boolean;

	announced: string = 'not';
	subscription: Subscription;
	constructor(public authService: AuthService) {}

	ngOnInit(): void {
		/*
		const pl: TokenPayload = this.authService.getPayload();
		if (pl) {
			this.user = pl.user;
		} else {
		}

		this.subscription = this.authService.login$.subscribe(loginResponse => {
			if (loginResponse) {
				console.log('loginRes2: ' + JSON.stringify(loginResponse));
				this.authService.
				const pl: TokenPayload = this.authService.getPayload();
				if (pl) {
					this.user = pl.user;
				} else {
					this.user = undefined;
				}
				console.log('user' + this.user);
				console.log('and dis happend' + JSON.stringify(this.authService.getPayload()));
			} else {
				console.log('no loginresponse, user undef!!');
				this.user = undefined;
			}
		});

		console.log('user at init: ' + JSON.stringify(this.user));*/
	}

	ngOnDestroy() {
		// prevent memory leak when component destroyed
		this.subscription.unsubscribe();
	}

	public isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}
}
