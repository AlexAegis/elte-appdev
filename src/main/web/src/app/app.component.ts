import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title: string = 'client';

	constructor(public authService: AuthService) {}

	ngOnInit(): void {}

	whoami(): any {
		console.log('whoami');
		this.authService.queryCurrentUser().subscribe(observable => {
			console.log(observable);
		});
	}
}
