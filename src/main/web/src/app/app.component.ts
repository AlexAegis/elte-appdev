import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'client';
	constructor(private userService: UserService, private authService: AuthService) {}

	ngOnInit(): void {}

	public isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}
}
