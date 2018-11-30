import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';

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

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({});
		console.log('init');
	}

	ngAfterViewInit(): void {
		this.userService.username$.subscribe(username => {
			console.log('new suername arrived to the logincomponent: ' + username);
			this.loginForm.updateValueAndValidity();
			this.loginForm
				.get('user')
				.get('username')
				.updateValueAndValidity();

			//this.cd.detectChanges();
		});
		this.loginForm.setErrors(this.userService.errors);
		this.cd.detectChanges(); // Because we changed the structure after view init
		this.userService.errors = undefined;
	}

	initRegistration() {
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

	log(e) {
		console.log(e);
	}
}
