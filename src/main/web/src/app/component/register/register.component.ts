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

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	animations: [slideInAnimation]
})
export class RegisterComponent implements OnInit {
	hidePassword = true;
	registrationForm: FormGroup = this.formBuilder.group({});

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {}

	register(): void {}
}
