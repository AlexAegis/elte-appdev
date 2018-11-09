import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
	providedIn: 'root'
})
export class LibreGuard implements CanActivate {
	constructor(private auth: AuthService) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.auth.user) {
			console.log('auth false, routing allowed');
			return true;
		}
		console.log('auth, routing denied');
		return false;
	}
}
