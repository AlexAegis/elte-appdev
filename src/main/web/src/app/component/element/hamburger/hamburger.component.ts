import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-hamburger',
	templateUrl: './hamburger.component.html',
	styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent implements OnInit {
	constructor() {}

	private _open: boolean;
	@Output() openChange = new EventEmitter<boolean>();

	set open(open: boolean) {
		this._open = open;
		this.openChange.emit(this._open);
	}

	@Input()
	get open() {
		return this._open;
	}

	ngOnInit() {}

	toggle(): void {
		this.open = !this.open;
		this.openChange.emit(this.open);
	}
}
