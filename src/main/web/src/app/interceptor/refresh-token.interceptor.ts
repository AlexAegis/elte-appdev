import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
@Injectable({ providedIn: 'root' })
export class RefreshTokenInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService) {}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (
			!req.url.startsWith('oauth') &&
			!req.url.startsWith('rest/public') &&
			!req.url.startsWith('rest/users/current')
		) {
			// this.auth.refresh();
		}
		return next.handle(req);
	}
}
