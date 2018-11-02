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
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	loginCheckUrl = `${environment.apiBaseURL}/login-check`;
	refreshTokenUrl = `${environment.apiBaseURL}/refresh-token`;

	// Observable string sources
	// private subject: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(undefined);
	private subject: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(
		this.getPayload() ? { token: this.getAccessToken(), refresh_token: undefined } : undefined
	);

	// Observable string streams
	login$: Observable<LoginResponse> = this.subject.asObservable();
	user: User = undefined;

	constructor(private http: HttpClient, private jwt: JwtHelperService) {
		console.log('CONSTRUXCTING SERVICE');
		this.subject.subscribe(
			(r: LoginResponse) => {
				if (r) {
					this.setAccessToken(r.token);
					this.setRefreshToken(r.refresh_token);
					this.user = this.getPayload().user;
				} else {
					this.user = undefined;
				}
				return this.user;
			},
			err => {
				this.handleAuthenticationError(err);
			}
		);
	}

	login(username: string, password: string): Observable<LoginResponse> {
		console.log('loggin in');
		this.http
			.post<LoginResponse>(`${environment.apiBaseURL}/public/users/login`, {
				username: username,
				password: password
			})
			.subscribe(res => this.subject.next(res));

		return this.subject;
	}

	logout() {
		console.log('LOGOUT');
		this.setAccessToken(undefined);
		this.setRefreshToken(undefined);
		this.subject.next(undefined);
	}

	public isLoggedIn(): boolean {
		try {
			return moment().isBefore(this.getExpiration());
		} catch (e) {
			return false;
		}
	}

	isLoggedOut(): boolean {
		return !this.isLoggedIn();
	}

	getExpiration(): Date {
		return this.jwt.getTokenExpirationDate();
	}

	getPayload(): TokenPayload {
		return this.jwt.decodeToken(this.jwt.tokenGetter());
	}

	queryCurrentUser(): Observable<User> {
		console.log('queryCurrentUser');
		if (this.isLoggedIn()) {
			return this.http.get<User>('rest/users/current');
		} else {
			return undefined;
		}
	}

	refresh(): Observable<LoginResponse> {
		const body = new HttpParams().set('refresh_token', this.getRefreshToken());

		const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		const refreshObservable = this.http.post<LoginResponse>(this.refreshTokenUrl, body.toString(), {
			headers
		});

		const refreshSubject = new ReplaySubject<LoginResponse>(1);
		refreshSubject.subscribe(
			(r: LoginResponse) => {
				this.setAccessToken(r.token);
				this.setRefreshToken(r.refresh_token);
			},
			err => {
				this.handleAuthenticationError(err);
			}
		);

		refreshObservable.subscribe(refreshSubject);
		return refreshSubject;
	}

	isAuthenticated(): boolean {
		return !!this.getAccessToken();
	}

	private handleAuthenticationError(err: any) {
		this.logout();
	}

	private setAccessToken(accessToken: string) {
		if (!accessToken) {
			localStorage.removeItem('access_token');
		} else {
			localStorage.setItem('access_token', accessToken);
		}
	}

	private setRefreshToken(refreshToken: string) {
		if (!refreshToken) {
			localStorage.removeItem('refresh_token');
		} else {
			localStorage.setItem('refresh_token', refreshToken);
		}
	}

	getAccessToken() {
		return localStorage.getItem('access_token');
	}

	getRefreshToken() {
		return localStorage.getItem('refresh_token');
	}
}
