import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-person',
	templateUrl: './person.component.html',
	styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
	@Input() personForm: FormGroup;
	constructor() {}

	ngOnInit() {}
}
