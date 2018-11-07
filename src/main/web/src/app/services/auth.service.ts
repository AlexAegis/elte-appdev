import * as moment from 'moment';
import { User } from '../model/user.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, BehaviorSubject, ReplaySubject, Observable, from, observable } from 'rxjs';
import { LoginResponse } from '../model/login-response.interface';
import { environment } from '../../environments/environment';
import { TokenPayload } from '../model/token-payload.interface';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { shareReplay } from 'rxjs/operators';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	loginCheckUrl = `${environment.apiBaseURL}/login-check`;
	refreshTokenUrl = `${environment.apiBaseURL}/refresh-token`;

	private subject: BehaviorSubject<User> = new BehaviorSubject<User>(
		this.oAuthService.getAccessToken() ? (this.oAuthService.getIdentityClaims() as User) : undefined
	);

	// Observable string streams
	login$: Observable<User> = this.subject.asObservable();
	user: User = this.oAuthService.getIdentityClaims() as User;

	constructor(private http: HttpClient, private oAuthService: OAuthService) {
		console.log('CONSTRUXCTING SERVICE');
		this.oAuthService.tokenEndpoint = 'oauth/token';
		this.oAuthService.userinfoEndpoint = 'rest/users/current';
		this.oAuthService.clientId = 'EmblaMagazineClient';
		this.oAuthService.scope = 'read write';
		this.oAuthService.dummyClientSecret = 'f2a1ed52710d4533bde25be6da03b6e3';
		this.oAuthService.requireHttps = false;
		this.oAuthService.showDebugInformation = true;
		this.oAuthService.useHttpBasicAuthForPasswordFlow = true;
		this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
		this.oAuthService.oidc = false;

		this.subject.subscribe((r: User) => {
			if (r) {
				this.user = r;
			} else {
				this.user = undefined;
			}
			return this.user;
		});
	}

	login(username: string, password: string) {
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
