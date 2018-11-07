import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { User } from '../../model/user.interface';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
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
// import { OAuthService } from 'angular-oauth2-oidc';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const forbidden = nameRe.test(control.value);
		return forbidden ? { forbiddenName: { value: control.value } } : undefined;
	};
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
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

	async doLogin() {
		await this.auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
	}
}
