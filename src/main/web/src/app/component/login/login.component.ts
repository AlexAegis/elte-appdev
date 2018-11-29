import {
	Component,
	OnInit,
	HostListener,
	OnDestroy,
	Input,
	ViewChild
} from '@angular/core';
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
import { Subscription, of } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material';
import { OAuthService } from 'angular-oauth2-oidc';
import { trigger } from '@angular/animations';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from 'src/app/service/user/user.service';
import { map, catchError } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	constructor(
		private auth: AuthService,
		private formBuilder: FormBuilder,
		public userService: UserService
	) {}

	loginForm: FormGroup = this.formBuilder.group({});

	ngOnInit(): void {}

	ngOnDestroy() {
		// prevent memory leak when component destroyed
	}
	initRegistration() {
		this.userService.username = this.loginForm
			.get('user')
			.get('username').value;
	}

	doLogin(form: NgForm) {
		this.userService.username = undefined;
		this.auth
			.login(
				this.loginForm.get('user').get('username').value,
				this.loginForm.get('user').get('password').value
			)
			.pipe(
				catchError(err => {
					console.log('hihi: ' + err);
					return of(err);
				})
			);
	}

	log(e) {
		console.log(e);
	}
}
