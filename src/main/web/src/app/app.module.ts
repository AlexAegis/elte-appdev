import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './router/routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './component/hello/hello.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './component/user/user.component';
import { LoadingComponent } from './component/loading/loading.component';
import { LoadingDirective } from './directives/loading.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { MomentModule } from 'ngx-moment';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RefreshTokenInterceptor } from './interceptor/refresh-token.interceptor';
import { HolaComponent } from './component/dummy/hola/hola.component';
import { HaloComponent } from './component/dummy/halo/halo.component';
import { AvatarModule } from 'ngx-avatar';
import { RegisterComponent } from './component/register/register.component';
@NgModule({
	entryComponents: [LoadingComponent],
	declarations: [
		AppComponent,
		HelloComponent,
		LoginComponent,
		UserComponent,
		LoadingComponent,
		LoadingDirective,
		HolaComponent,
		HaloComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		RoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		OAuthModule.forRoot({
			resourceServer: {
				allowedUrls: ['rest'],
				sendAccessToken: true
			}
		}),
		MomentModule,
		NgProgressModule.forRoot({
			trickleSpeed: 200,
			min: 20,
			debounceTime: 500,
			color: '#84f8ff',
			spinner: false
		}),
		AvatarModule,
		NgProgressHttpModule.forRoot(),
		BrowserAnimationsModule,
		MaterialModule
	],
	providers: [
		AuthService,
		{
			provide: HTTP_INTERCEPTORS,
			useExisting: RefreshTokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
