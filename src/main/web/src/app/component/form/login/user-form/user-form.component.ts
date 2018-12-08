import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { matchValidator } from 'src/app/validator/match.validator';
import { requiredIf } from 'src/app/validator/required-if.validator';
import { validateObservable } from 'src/app/validator/observable.validator';
import { UserService } from 'src/app/service/user/user.service';
import { UserAvailableResponse } from 'src/app/api/public/user/available.get.interface';
import { ApiResponse } from 'src/app/api/api-response.interface';
import { ParentErrorStateMatcher } from 'src/app/function/material/error-state-matcher.class';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnInit {
	parentMatcher: ParentErrorStateMatcher = new ParentErrorStateMatcher();

	constructor(private formBuilder: FormBuilder, public userService: UserService) {}

	hide = true;

	@Input()
	parent: FormGroup;

	@Input()
	confirmNeeded: boolean = false;

	@Input()
	requireExisting: boolean = false;

	user: FormGroup;

	@ViewChild('username')
	username: ElementRef;

	@ViewChild('password')
	password: ElementRef;

	usernameFocused: boolean;
	passwordFocused: boolean;

	focusUsername(focus: boolean = true): void {
		this.usernameFocused = focus;
	}

	focusPassword(focus: boolean = true): void {
		this.passwordFocused = focus;
	}

	ngOnInit() {
		this.usernameFocused = true;
		this.user = this.formBuilder.group(
			{
				username: [
					this.userService.username.getValue() || '',
					[Validators.required],
					[
						validateObservable<ApiResponse<UserAvailableResponse>>(
							(ctrl: AbstractControl) => this.userService.usernameTaken(ctrl.value),
							(result: ApiResponse<UserAvailableResponse>) => {
								if (!this.requireExisting) {
									return result.data.available ? undefined : { taken: false };
								} else {
									return result.data.available ? { taken: true } : undefined;
								}
							},
							200
						)
					]
				],
				password: ['', [Validators.required]],
				passwordConfirm: ['', [requiredIf(this.confirmNeeded)]]
			},
			{
				validator: matchValidator('password', 'passwordConfirm', this.confirmNeeded)
			}
		);
		this.parent.addControl('user', this.user);
		if (this.userService.username.getValue()) {
			this.user.get('username').markAsDirty();
		}
	}
}
