import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
	tokenEndpoint: 'oauth/token',
	userinfoEndpoint: 'rest/users/current',
	clientId: 'CinemaClient',
	scope: 'read write',
	dummyClientSecret: 'f2a1ed52710d4533bde25be6da03b6e3',
	requireHttps: false,
	showDebugInformation: true,
	useHttpBasicAuthForPasswordFlow: true,
	oidc: false
};
