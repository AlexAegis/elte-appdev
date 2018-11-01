import * as moment from 'moment';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient, private jwt: JwtHelperService) {}

	// Observable string sources
	private loggedInSource: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);

	// Observable string streams
	loggedInAnnounced = this.loggedInSource.asObservable();

	async login(username: string, password: string) {
		try {
			console.log('loggin in');
			const res = await this.http
				.post<User>('rest/public/users/login', { username: username, password: password })
				.toPromise();
			this.setSession(res);
			console.log('login res: ' + JSON.stringify(res));
			const u = await this.queryCurrentUser();
			console.log('user: ' + u);
			this.loggedInSource.next(await this.queryCurrentUser());
			// this.loggedInSource.next({ username: 'fuckall', password: 'nono' });
		} catch {}
	}

	private setSession(authResult) {
		localStorage.setItem('access_token', authResult.authResult);
	}

	logout() {
		localStorage.removeItem('access_token');
		this.loggedInSource.next(undefined);
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

	async queryCurrentUser() {
		if (this.isLoggedIn()) {
			try {
				return await this.http.get<User>('rest/users/current').toPromise();
			} catch {}
		}
	}
}
