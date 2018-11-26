import { Component, OnInit } from '@angular/core';
import {
	trigger,
	state,
	style,
	transition,
	animate
} from '@angular/animations';

import { slideInAnimation } from 'src/app/animation/route.animation';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user.class';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	animations: [slideInAnimation]
})
export class RegisterComponent implements OnInit {
	hidePassword = true;
	registrationForm: FormGroup = this.formBuilder.group({});

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService
	) {}

	ngOnInit() {}

	register(): void {
		console.log('registration!');
		const user: User = new User();
		user.username = this.registrationForm.get('user').get('username').value;
		user.password = this.registrationForm.get('user').get('password').value;
		Object.assign(user.person, this.registrationForm.get('person').value);
		this.userService.register(user);
	}
}
