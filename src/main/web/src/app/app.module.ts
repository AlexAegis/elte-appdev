import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './module/routes/routing.module';
import { AppComponent } from './component/app.component';
import { LoginComponent } from './component/form/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './component/form/user/user.component';
import { LoadingComponent } from './component/element/loading/loading.component';
import { LoadingDirective } from './directive/loading.directive';
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
import { RegisterComponent } from './component/form/register/register.component';
import { LoremComponent } from './component/dummy/lorem/lorem.component';
import { PersonComponent } from './component/form/people/person/person.component';
import { UserFormComponent } from './component/form/login/user-form/user-form.component';
import { UserService } from './service/user/user.service';
import { FocusDirective } from './directive/focus.directive';
import { HomeComponent } from './component/page/home/home.component';
import { WelcomeComponent } from './component/page/welcome/welcome.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SmoothScrollModule } from 'ngx-scrollbar';
import { SidebarComponent } from './component/element/sidebar/sidebar.component';
import { HamburgerComponent } from './component/element/hamburger/hamburger.component';
import { MovieListComponent } from './component/page/movie-list/movie-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { MovieComponent } from './component/page/movie/movie.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { MovieFormComponent } from './component/form/movie-form/movie-form.component';

@NgModule({
	entryComponents: [LoadingComponent],
	declarations: [
		AppComponent,
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
		FocusDirective,
		SidebarComponent,
		HamburgerComponent,
		MovieListComponent,
		MovieComponent,
		MovieFormComponent
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
		NgProgressModule.withConfig({
			trickleSpeed: 200,
			min: 20,
			debounceTime: 500,
			color: '#6dabff',
			spinner: false
		}),
		AvatarModule,
		NgProgressHttpModule,
		BrowserAnimationsModule,
		MaterialModule,
		NgScrollbarModule,
		SmoothScrollModule,
		FontAwesomeModule,
		AgGridModule.withComponents([])
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
export class AppModule {
	constructor() {
		library.add(fas, far);
	}
}
