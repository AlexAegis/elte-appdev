import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormBuilder, FormGroup, NgForm, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
	constructor(
		private auth: AuthService,
		private formBuilder: FormBuilder,
		public userService: UserService,
		private cd: ChangeDetectorRef,
		private router: Router
	) {
		console.log('construct');
	}

	loginForm: FormGroup;

	@ViewChild('userForm')
	userForm: UserFormComponent;

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({});
	}

	ngAfterViewInit(): void {
		this.userService.username$.subscribe(username => {
			const usernameControl: AbstractControl = this.loginForm.get('user').get('username');

			if (username) {
				usernameControl.setValue(username);
				this.userForm.focusPassword();
			}
			usernameControl.updateValueAndValidity();
		});
		this.loginForm.setErrors(this.userService.errors);
		this.cd.detectChanges(); // Because we changed the structure after view init
		this.userService.errors = undefined;
	}

	initRegistration() {
		this.userForm.focusUsername(false);
		this.userService.username.next(this.loginForm.get('user').get('username').value);
	}

	doLogin(form: NgForm) {
		this.userService.username.next(undefined);
		this.auth
			.login(this.loginForm.get('user').get('username').value, this.loginForm.get('user').get('password').value)
			.subscribe(
				observer => this.router.navigate(['']),
				err => {
					this.userService.errors = { login_failed: true };
				}
			);
	}
}
