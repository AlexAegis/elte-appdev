import {
	Component,
	OnInit,
	Input,
	Output,
	OnChanges,
	ViewChild,
	ElementRef
} from '@angular/core';
import {
	FormGroup,
	Validators,
	FormBuilder,
	AbstractControl
} from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';
import { matchValidator } from 'src/app/validator/match.validator';
import { requiredIf } from 'src/app/validator/required-if.validator';
import { validateObservable } from 'src/app/validator/observable.validator';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/service/user/user.service';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {
	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService
	) {}

	hide = true;

	ngOnChanges() {
		console.log('RERER');
	}

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
						validateObservable<boolean>(
							(ctrl: AbstractControl) =>
								this.userService.usernameTaken(ctrl.value),
							(result: boolean) => {
								if (this.allowExisting) {
									return result
										? undefined
										: { taken: false };
								} else {
									return result ? { taken: true } : undefined;
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
				validator: matchValidator(
					'password',
					'passwordConfirm',
					this.confirmNeeded
				)
			}
		);
		this.parent.setControl('user', this.user);
	}
}
