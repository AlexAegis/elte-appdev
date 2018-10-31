import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { User } from '../../model/user';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm = this.formBuilder.group({
		username: ['', Validators.required],
		password: ['', Validators.required]
	});

	constructor(private auth: AuthService, private formBuilder: FormBuilder) {}

	ngOnInit() {}

	ngOnDestroy() {
		// prevent memory leak when component destroyed
	}

	doLogin() {
		console.log('Login with ' + this.loginForm.get('username').value + ' ' + this.loginForm.get('password').value);
		return this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
	}
}
