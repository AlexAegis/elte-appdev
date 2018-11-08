import * as moment from 'moment';
import { User } from '../model/user.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, from, observable } from 'rxjs';
import { LoginResponse } from '../model/login-response.interface';
import { environment } from '../../environments/environment';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	loginCheckUrl = `${environment.apiBaseURL}/login-check`;
	refreshTokenUrl = `${environment.apiBaseURL}/refresh-token`;

	private subject: BehaviorSubject<User> = new BehaviorSubject<User>(
		this.oAuthService.getAccessToken() ? (this.oAuthService.getIdentityClaims() as User) : undefined
	);

	login$: Observable<User> = this.subject.asObservable();
	user: User = this.oAuthService.getIdentityClaims() as User;

	constructor(private http: HttpClient, private oAuthService: OAuthService) {
		console.log('CONSTRUXCTING SERVICE');
		this.oAuthService.configure(authConfig);
		this.oAuthService.tokenValidationHandler = new JwksValidationHandler();

		this.subject.subscribe((user: User) => {
			if (user) {
				this.user = user;
			} else {
				this.user = undefined;
			}
			return this.user;
		});
	}

	login(username: string, password: string) {
		console.log('start');
		from(this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password)).subscribe(observer =>
			this.subject.next(observer as User)
		);
	}

	logout() {
		this.oAuthService.logOut();
		this.subject.next(undefined);
	}

	refresh() {
		this.oAuthService.refreshToken().then(() => {
			console.debug('ok');
		}); /*
		from(this.oAuthService.refreshToken()).subscribe(observer => {
			console.log('baakfitty');
			console.log(observer);
		});*/
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
