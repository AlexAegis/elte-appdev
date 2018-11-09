import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloComponent } from '../components/hello/hello.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../guard/auth.guard';
import { HolaComponent } from '../dummy/hola/hola.component';
import { HaloComponent } from '../dummy/halo/halo.component';
import { LibreGuard } from '../guard/libre.guard';

const routes: Routes = [
	{
		path: 'login',
		component: HaloComponent,
		canActivate: [LibreGuard]
	},
	{ path: 'login', component: HolaComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class RoutingModule {}
