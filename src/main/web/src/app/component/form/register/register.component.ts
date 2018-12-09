import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { slideInAnimation } from 'src/app/animation/route.animation';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user.class';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiResponse } from 'src/app/api/api-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from 'src/app/api/error-response.interface';
import { RegisterResponse } from 'src/app/api/public/user/register.post.interface';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	animations: [slideInAnimation]
})
export class RegisterComponent implements OnInit, OnDestroy {
	hidePassword = true;
	registrationForm: FormGroup = this.formBuilder.group({});
	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private router: Router,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {}

	register(): void {
		const user: User = new User();
		user.username = this.registrationForm.get('user').get('username').value;
		user.password = this.registrationForm.get('user').get('password').value;
		Object.assign(user.person, this.registrationForm.get('person').value);
		this.userService.register(user).subscribe(
			res => {
				this.userService.username.next(res.data.username);
				this.router.navigateByUrl('/');
			},
			err => {
				const errors = {};

				(<ErrorResponse<RegisterResponse>>err).error.messages.forEach(me => {
					errors[me.message] = true;
				});
				console.log(errors);
				this.registrationForm.setErrors(errors, { emitEvent: true });
				//this.registrationForm.controls['user'].setErrors(errors, { emitEvent: true });
				this.cd.detectChanges();
				console.log('regerrorrs: ');
				console.log(this.registrationForm.errors);
				console.log((<ErrorResponse<RegisterResponse>>err).error.messages);
			}
		);
	}

	ngOnDestroy() {}
}
