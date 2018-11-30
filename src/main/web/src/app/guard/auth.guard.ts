import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(private auth: AuthService) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.isAuthenticated();
	}

	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.isAuthenticated();
	}

	isAuthenticated(): boolean {
		if (!this.auth.user) {
			console.log('auth false, routing denied');
			return false;
		}
		console.log('auth, routing allowed');
		return true;
	}
}
