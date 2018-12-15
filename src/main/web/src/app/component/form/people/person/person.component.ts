import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
	selector: 'app-person',
	templateUrl: './person.component.html',
	styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
	@Input()
	parent: FormGroup;

	person: FormGroup = PersonComponent.create(this.formBuilder);

	static create(fb: FormBuilder): FormGroup {
		return fb.group({
			firstName: [''],
			lastName: ['']
		});
	}

	ngOnInit() {
		this.parent.setControl('person', this.person);
	}

	constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef) {}
	/*
	ngAfterViewInit(): void {
		this.cd.detectChanges();
	}*/
}
