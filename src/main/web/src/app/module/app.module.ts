import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './router/routing.module';
import { AppComponent } from '../component/app.component';
import { HelloComponent } from '../component/hello/hello.component';
import { LoginComponent } from '../component/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from '../component/user/user.component';
import { LoadingComponent } from '../component/loading/loading.component';
import { LoadingDirective } from '../directive/loading.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MomentModule } from 'ngx-moment';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RefreshTokenInterceptor } from '../interceptor/refresh-token.interceptor';
import { HolaComponent } from '../component/dummy/hola/hola.component';
import { HaloComponent } from '../component/dummy/halo/halo.component';
import { AvatarModule } from 'ngx-avatar';
import { RegisterComponent } from '../component/register/register.component';
import { LoremComponent } from '../component/dummy/lorem/lorem.component';
import { PersonComponent } from '../component/people/person/person.component';
import { UserFormComponent } from '../component/login/user-form/user-form.component';
import { UserService } from '../service/user/user.service';
import { FocusDirective } from '../directive/focus.directive';
import { HomeComponent } from '../component/page/home/home.component';
import { WelcomeComponent } from '../component/page/welcome/welcome.component';
@NgModule({
	entryComponents: [LoadingComponent],
	declarations: [
		AppComponent,
		HelloComponent,
		WelcomeComponent,
		HomeComponent,
		LoginComponent,
		UserComponent,
		LoadingComponent,
		LoadingDirective,
		HolaComponent,
		HaloComponent,
		RegisterComponent,
		LoremComponent,
		PersonComponent,
		UserFormComponent,
		FocusDirective
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
		UserService,
		{
			provide: HTTP_INTERCEPTORS,
			useExisting: RefreshTokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
