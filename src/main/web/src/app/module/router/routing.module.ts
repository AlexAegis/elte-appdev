import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { LibreGuard } from '../../guard/libre.guard';
import { RegisterComponent } from '../../component/register/register.component';
import { HaloComponent } from '../../component/dummy/halo/halo.component';
import { HolaComponent } from '../../component/dummy/hola/hola.component';
import { LoginComponent } from '../../component/login/login.component';
import { HomeComponent } from 'src/app/component/page/home/home.component';
import { WelcomeComponent } from 'src/app/component/page/welcome/welcome.component';

/**
 * TODO: The idea is to have a common outlet for the user interaction. And animate that.
 */
const routes: Routes = [
	{
		path: '',
		canActivateChild: [AuthGuard],

		canLoad: ['register'],
		//runGuardsAndResolvers: 'always',
		//component: HolaComponent,
		children: [
			{
				path: 'hello',
				component: HaloComponent
			},
			{ path: 'logout', redirectTo: '' },
			{ path: 'login', redirectTo: '', canActivate: [AuthGuard] }
		]
	},
	{ path: 'register', component: RegisterComponent }
	/*{ path: '', component: LoginComponent, outlet: 'register' }*/
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
