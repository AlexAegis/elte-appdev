import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-hamburger',
	templateUrl: './hamburger.component.html',
	styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent implements OnInit {
	constructor() {}

	open: boolean;

	ngOnInit() {}

	toggle(): void {
		this.open = !this.open;
	}
}
