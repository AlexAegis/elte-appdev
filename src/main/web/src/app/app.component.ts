import { Component, OnInit, OnDestroy } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './services/auth.config';
import { runInThisContext } from 'vm';
import { AuthService } from './services/auth.service';
// import { AuthService } from './services/auth.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title: string = 'client';

	constructor(public authService: AuthService) {}

	ngOnInit(): void {}

	whoami(): any {
		console.log('whoami');
	}
}
