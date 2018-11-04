import * as moment from 'moment';
import { User } from '../model/user.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, BehaviorSubject, ReplaySubject, Observable, from } from 'rxjs';
import { LoginResponse } from '../model/login-response.interface';
import { environment } from '../../environments/environment';
import { TokenPayload } from '../model/token-payload.interface';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { shareReplay } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	loginCheckUrl = `${environment.apiBaseURL}/login-check`;
	refreshTokenUrl = `${environment.apiBaseURL}/refresh-token`;

	private subject: BehaviorSubject<User> = new BehaviorSubject<User>(
		this.oAuthService.getAccessToken() ? new User() : undefined
	);

	// Observable string streams
	login$: Observable<User> = this.subject.asObservable();
	user: User = undefined;

	constructor(private http: HttpClient, private oAuthService: OAuthService) {
		console.log('CONSTRUXCTING SERVICE');
		this.subject.subscribe((r: User) => {
			if (r) {
				this.user = r;
			} else {
				this.user = undefined;
			}
			return this.user;
		});
	}

	async login(username: string, password: string) {
		await this.oAuthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password);
		this.subject.next(await this.queryCurrentUser().toPromise());
		return this.subject;
	}

	queryCurrentUser(): Observable<User> {
		return this.http.get<User>('rest/users/current');
	}
}
