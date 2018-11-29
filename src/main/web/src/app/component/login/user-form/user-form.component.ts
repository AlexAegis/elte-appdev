import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';
import { matchValidator } from 'src/app/validator/match.validator';
import { requiredIf } from 'src/app/validator/required-if.validator';
import { validateObservable } from 'src/app/validator/observable.validator';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/service/user/user.service';
import { UserAvailableResponse } from 'src/app/model/api/public/user/available.get.interface';
import { ApiResponse } from 'src/app/model/api/api-response.interface';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnInit, AfterViewInit {
	ngAfterViewInit(): void {
		console.log('asda');
	}

	constructor(private formBuilder: FormBuilder, private userService: UserService) {}

	hide = true;

	@Input()
	parent: FormGroup;

	@Input()
	confirmNeeded: boolean = false;

	@Input()
	allowExisting: boolean = false;

	user: FormGroup;

	@ViewChild('username')
	username: ElementRef;

	ngOnInit() {
		this.user = this.formBuilder.group(
			{
				username: [
					this.userService.username || '',
					[Validators.required],
					[
						validateObservable<ApiResponse<UserAvailableResponse>>(
							(ctrl: AbstractControl) => this.userService.usernameTaken(ctrl.value),
							(result: ApiResponse<UserAvailableResponse>) => {
								if (this.allowExisting) {
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
		this.parent.setControl('user', this.user);
		if (this.userService.username) {
			this.user.get('username').markAsDirty();
		}
	}
}
