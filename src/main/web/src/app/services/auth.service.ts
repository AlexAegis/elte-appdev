import * as moment from 'moment';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient, private jwt: JwtHelperService) {}

	login(email: string, password: string) {
		return this.http
			.post<User>('rest/public/users/login', { username: email, password: password })
			.subscribe(res => {
				console.log(res);
				this.setSession(res);
			});
	}

	private setSession(authResult) {
		console.log('setsess called');

		// const expiresAt = moment().add(authResult.expiresIn, 'second');

		localStorage.setItem('access_token', authResult.authResult);

		const helper = new JwtHelperService();
		console.log('getTokenExpirationDate called');
		const expirationDate = helper.getTokenExpirationDate(authResult.authResult);

		// const exp_date = this.jwt.decodeToken();
		console.log(expirationDate);
		console.log('expdate called');
		// localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
	}

	logout() {
		localStorage.removeItem('access_token');
	}

	public isLoggedIn() {
		return moment().isBefore(this.getExpiration());
	}

	isLoggedOut() {
		return !this.isLoggedIn();
	}

	getExpiration() {
		const expiration = localStorage.getItem('expires_at');
		const expiresAt = JSON.parse(expiration);
		return moment(expiresAt);
	}
}
