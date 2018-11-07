import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({ providedIn: 'root' })
export class RefreshTokenInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService) {}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!req.url.startsWith('oauth')) {
			this.auth.refresh();
		}
		return next.handle(req);
	}
}
