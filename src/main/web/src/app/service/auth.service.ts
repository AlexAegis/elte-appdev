import * as moment from 'moment';
import { User } from '../model/user.class';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { TypedJSON } from 'typedjson-fork';
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

	login(username: string, password: string): Observable<User> {
		const loginObs: Observable<User> = from<User>(<Promise<User>>
			this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(
				username,
				password
			)
		); /*.pipe(o => {
			// tslint:disable-next-line:no-null-keyword
			console.log('FIRST IPPPIEP');
			this.subject.next(null);
			return o;
		})*/
		loginObs.subscribe(
			observer => this.subject.next(TypedJSON.parse(observer, User)),
			err => {
				console.log('ERROR IN INNERMOST');
				this.subject.next(undefined);
				//this.subject.error(err);
				return err;
			}
		);
		return loginObs;
		//return this.login$;
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
