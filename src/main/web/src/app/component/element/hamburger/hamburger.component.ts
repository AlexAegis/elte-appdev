import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-hamburger',
	templateUrl: './hamburger.component.html',
	styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent implements OnInit {
	constructor() {}

	@Output() openChange = new EventEmitter<boolean>();
	private _open: boolean;

	set open(open: boolean) {
		this._open = open;
		this.openChange.emit(this.open);
	}

	@Input()
	get open(): boolean {
		return this._open;
	}

	ngOnInit() {}

	toggle(): void {
		this.open = !this.open;
	}
}
