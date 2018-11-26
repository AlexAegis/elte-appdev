import {
	Component,
	OnInit,
	Input,
	Output,
	ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';
import { matchValidator } from 'src/app/validator/match.validator';
import { requiredIf } from 'src/app/validator/required-if.validator';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
	constructor(private formBuilder: FormBuilder) {}

	hide = true;

	@Input()
	parent: FormGroup;

	@Input()
	confirmNeeded: boolean;

	user: FormGroup;

	ngOnInit() {
		this.user = this.formBuilder.group(
			{
				username: ['', [Validators.required]],
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
