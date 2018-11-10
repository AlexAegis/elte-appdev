import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { User } from '../../model/user.class';
import * as moment from 'moment';
import { AuthService } from '../../service/auth.service';
import {
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
	FormGroupDirective,
	NgForm,
	ValidatorFn,
	AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material';
import { OAuthService } from 'angular-oauth2-oidc';
import { trigger } from '@angular/animations';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	hide = true;
	loginForm: FormGroup = this.formBuilder.group(
		{
			username: ['', [Validators.required]],
			password: ['', [Validators.required]]
		},
		{
			validator: forbiddenNameValidator(/asd/)
		}
	);

	constructor(private auth: AuthService, private formBuilder: FormBuilder) {}

	ngOnInit() {}

	ngOnDestroy() {
		// prevent memory leak when component destroyed
	}

	doLogin() {
		this.auth.login(
			this.loginForm.get('username').value,
			this.loginForm.get('password').value
		);
	}
}
