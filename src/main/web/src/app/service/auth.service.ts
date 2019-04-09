import * as moment from 'moment';
import { User } from '../model/user.class';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { TypedJSON } from 'typedjson-fork';
import { map, catchError } from 'rxjs/operators';
import { log } from 'util';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private subject: BehaviorSubject<User> = new BehaviorSubject<User>(
		this.oAuthService.getAccessToken() ? TypedJSON.parse(this.oAuthService.getIdentityClaims(), User) : undefined
	);

	login$: Observable<User> = this.subject.asObservable();
	private _user: User = undefined;
	get user(): User {
		//console.log('user accessed' + this._user);
		return this._user;
	}
	set user(user: User) {
		//console.log('user setted' + user);
		this._user = user;
	}
	constructor(private http: HttpClient, private oAuthService: OAuthService, private router: Router) {
		this.oAuthService.configure(authConfig);
		this.oAuthService.tokenValidationHandler = new JwksValidationHandler();

		this.subject.subscribe((user: User) => {
			return (this.user = user);
		});
	}

	hasAuth(authority: string): boolean {
		return (
			this.user &&
			this.user.authorities &&
			this.user.authorities.filter(auth => auth.authority === authority).length > 0
		);
	}

	login(username: string, password: string): Observable<User> {
		const loginObs: Observable<User> = from(<Promise<User>>(
			this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password)
		))
			.pipe(o => {
				console.log('FEED NULL');
				// tslint:disable-next-line:no-null-keyword
				this.subject.next(null);
				return o;
			})
			.pipe<User>(
				map<User, User>(observer => {
					this.subject.next(TypedJSON.parse(observer, User));
					return observer;
				})
			)
			.pipe(
				catchError(err => {
					this.subject.next(undefined);
					return throwError(err);
				})
			);
		return loginObs;
	}

	logout() {
		this.subject.next(undefined);
		this.oAuthService.logOut(true);
	}

	refresh() {
		this.oAuthService.refreshToken().then(() => {
			// console.debug('token refreshed');
		});
	}

	getAccessTokenExpiration(): moment.Moment {
		return moment(this.oAuthService.getAccessTokenExpiration());
	}

	getIdTokenExpiration(): moment.Moment {
		return moment(this.oAuthService.getIdTokenExpiration());
	}

	queryCurrentUser(): Observable<User> {
		return this.http.get<User>('rest/users/current');
	}
}
