import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-person',
	templateUrl: './person.component.html',
	styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
	@Input()
	parent: FormGroup;

	person: FormGroup = this.formBuilder.group({
		firstName: [''],
		lastName: ['']
	});

	ngOnInit() {
		this.parent.setControl('person', this.person);
	}

	constructor(private formBuilder: FormBuilder) {}
}
