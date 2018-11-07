import { Injectable, Inject, Optional } from '@angular/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'inspector';

@Injectable({ providedIn: 'root' })
export class RefreshTokenInterceptor implements HttpInterceptor {
	constructor(private authStorage: OAuthStorage) {}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// Interceptor Example
		// console.log(req.url);
		return next.handle(req);
	}
}
