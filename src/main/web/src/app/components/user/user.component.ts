import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	cu;
	constructor(private http: HttpClient, private userService: UserService, private authService: AuthService) {}

	ngOnInit() {
		this.cu = this.userService.queryCurrentUser();
	}

	async logout() {
		return await this.authService.logout();
	}
}
