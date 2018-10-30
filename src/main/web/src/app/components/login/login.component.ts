import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm = this.formBuilder.group({
		username: ['', Validators.required],
		password: ['', Validators.required]
	});

	constructor(private auth: AuthService, private formBuilder: FormBuilder) {}

	ngOnInit() {}

	doLogin() {
		console.log('Login with ' + this.loginForm.get('username').value + ' ' + this.loginForm.get('password').value);
		return this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
	}
}
