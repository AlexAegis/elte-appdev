import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloComponent } from '../component/hello/hello.component';
import { LoginComponent } from '../component/login/login.component';
import { AuthGuard } from '../guard/auth.guard';
import { LibreGuard } from '../guard/libre.guard';
import { RegisterComponent } from '../component/register/register.component';
import { HaloComponent } from '../component/dummy/halo/halo.component';
import { HolaComponent } from '../component/dummy/hola/hola.component';

const routes: Routes = [
	{
		path: 'login',
		component: HaloComponent,
		canActivate: [LibreGuard]
	},
	{ path: 'login', component: HolaComponent, canActivate: [AuthGuard] },
	{ path: 'register', component: RegisterComponent, outlet: 'register' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class RoutingModule {}
