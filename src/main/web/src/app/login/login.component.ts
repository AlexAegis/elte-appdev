import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import * as moment from 'moment';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	username;
	password;
	constructor(private auth: AuthService) {}

	ngOnInit() {}

	doLogin() {
		console.log('ASD' + this.username + this.password);
		return this.auth.login(this.username, this.password);
	}
}
