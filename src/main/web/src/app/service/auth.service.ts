import * as moment from 'moment';
import { User } from '../model/user.class';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import {
	Subject,
	BehaviorSubject,
	ReplaySubject,
	Observable,
	from,
	observable
} from 'rxjs';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { TypedJSON } from 'typedjson-fork';
import { unescapeIdentifier } from '@angular/compiler';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private subject: BehaviorSubject<User> = new BehaviorSubject<User>(
		this.oAuthService.getAccessToken()
			? TypedJSON.parse(this.oAuthService.getIdentityClaims(), User)
			: undefined
	);

	login$: Observable<User> = this.subject.asObservable();
	user: User = undefined;

	constructor(private http: HttpClient, private oAuthService: OAuthService) {
		this.oAuthService.configure(authConfig);
		this.oAuthService.tokenValidationHandler = new JwksValidationHandler();

		this.subject.subscribe((user: User) => {
			return (this.user = user);
		});
	}

	login(username: string, password: string) {
		from(
			this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(
				username,
				password
			)
		)
			.pipe(o => {
				// tslint:disable-next-line:no-null-keyword
				this.subject.next(null);
				return o;
			})
			.subscribe(
				observer => this.subject.next(TypedJSON.parse(observer, User)),
				err => this.subject.next(undefined)
			);
	}

	logout() {
		this.oAuthService.logOut();
		this.subject.next(undefined);
	}

	refresh() {
		this.oAuthService.refreshToken().then(() => {
			console.debug('token refreshed');
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
