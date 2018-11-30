import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-halo',
	templateUrl: './halo.component.html',
	styleUrls: ['./halo.component.scss']
})
export class HaloComponent implements OnInit {
	constructor() {
		console.log('halllloooo');
	}

	ngOnInit() {}
}
