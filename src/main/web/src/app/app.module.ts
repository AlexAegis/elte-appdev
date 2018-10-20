import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@NgModule({
	declarations: [AppComponent, HelloComponent, LoginComponent],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				headerName: 'Authorization',
				tokenGetter: () => {
					const token = localStorage.getItem('access_token');
					console.log('token' + token);
					return token;
				},
				whitelistedDomains: ['localhost:4200', 'http://localhost:4200/rest/users'],
				blacklistedRoutes: ['www.google.com']
			}
		})
	],
	providers: [AuthService],
	bootstrap: [AppComponent]
})
export class AppModule {}
