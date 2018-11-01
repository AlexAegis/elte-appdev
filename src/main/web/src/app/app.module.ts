import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingDirective } from './directives/loading.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { MomentModule } from 'ngx-moment';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
@NgModule({
	entryComponents: [LoadingComponent],
	declarations: [AppComponent, HelloComponent, LoginComponent, UserComponent, LoadingComponent, LoadingDirective],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		JwtModule.forRoot({
			config: {
				headerName: 'Authorization',
				tokenGetter: () => localStorage.getItem('access_token'),
				whitelistedDomains: ['localhost:4200', 'http://localhost:4200/rest/users'],
				blacklistedRoutes: ['www.google.com']
			}
		}),
		MomentModule,
		NgProgressModule.forRoot(),
		NgProgressHttpModule.forRoot(),
		BrowserAnimationsModule,
		MaterialModule
	],
	providers: [AuthService],
	bootstrap: [AppComponent]
})
export class AppModule {}
