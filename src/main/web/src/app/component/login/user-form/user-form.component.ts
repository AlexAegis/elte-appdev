import {
	Component,
	OnInit,
	Input,
	Output,
	ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/validator/name.validator';

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

	user: FormGroup = this.formBuilder.group(
		{
			username: ['', [Validators.required]],
			password: ['', [Validators.required]]
		},
		{
			validator: forbiddenNameValidator(/asd/)
		}
	);

	ngOnInit() {
		this.parent.setControl('user', this.user);
	}

	doSub() {
		console.log('asdasdasds');
	}
}
