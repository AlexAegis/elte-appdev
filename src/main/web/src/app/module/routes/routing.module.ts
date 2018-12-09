import { MovieListComponent } from './../../component/page/movie-list/movie-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { LibreGuard } from '../../guard/libre.guard';
import { HaloComponent } from '../../component/dummy/halo/halo.component';
import { HolaComponent } from '../../component/dummy/hola/hola.component';
import { HomeComponent } from 'src/app/component/page/home/home.component';
import { WelcomeComponent } from 'src/app/component/page/welcome/welcome.component';
import { RegisterComponent } from 'src/app/component/form/register/register.component';
import { MovieComponent } from 'src/app/component/page/movie/movie.component';

/**
 * TODO: The idea is to have a common outlet for the user interaction. And animate that.
 */
const routes: Routes = [
	{
		path: '',
		canActivateChild: [AuthGuard],
		canLoad: ['register'],
		children: [
			{ path: 'logout', redirectTo: '' },
			{ path: 'movies', component: MovieListComponent },
			{ path: 'movies/new', component: MovieComponent },
			{ path: 'movies/:id', component: MovieComponent },
			{ path: 'movie', component: MovieComponent }
		]
	},
	{ path: 'register', component: RegisterComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			onSameUrlNavigation: 'reload',
			enableTracing: false
		})
	],
	exports: [RouterModule]
})
export class RoutingModule {}
