import { Component, OnInit, OnDestroy } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './services/auth.config';
import { runInThisContext } from 'vm';
// import { AuthService } from './services/auth.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title: string = 'client';

	// TODO: move these into the auth.config.ts
	constructor(public oauthService: OAuthService) {
		this.oauthService.tokenEndpoint = 'oauth/token';
		this.oauthService.userinfoEndpoint = 'rest/users/current';
		this.oauthService.clientId = 'EmblaMagazineClient';
		this.oauthService.scope = 'read write';
		this.oauthService.dummyClientSecret = 'f2a1ed52710d4533bde25be6da03b6e3';
		this.oauthService.requireHttps = false;
		this.oauthService.showDebugInformation = true;
		this.oauthService.useHttpBasicAuthForPasswordFlow = true;
		this.oauthService.tokenValidationHandler = new JwksValidationHandler();
		this.oauthService.oidc = false;
	}

	ngOnInit(): void {}
}
