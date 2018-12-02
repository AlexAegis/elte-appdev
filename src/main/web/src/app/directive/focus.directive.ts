import { Directive, OnInit, Input, ElementRef, Renderer, EventEmitter, Output, AfterViewInit } from '@angular/core';
/**
 * Two way bound focus directive
 *
 * Usage:
 * <element [(focus)]="myBool">
 *
 * myBool can be changed to true if you want to set the elements focus.
 * If the element loses focus, myBool will be set to false.
 */
@Directive({
	selector: '[focus]'
})
export class FocusDirective implements OnInit, AfterViewInit {
	constructor(private hostElement: ElementRef, private renderer: Renderer) {}

	ngOnInit() {
		this.focusChange.subscribe(focus => {
			if (focus) {
				this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
			}
		});
		this.renderer.listen(this.hostElement.nativeElement, 'focus', () => {
			this.focus = true;
		});
		this.renderer.listen(this.hostElement.nativeElement, 'focusout', () => {
			this.focus = false;
		});
	}

	/**
	 * Initial state. If not emitted, the directive won't work until manual change of the input
	 */
	ngAfterViewInit() {
		this.focusChange.emit(this.focus);
	}

	@Output()
	focusChange = new EventEmitter<boolean>();

	private _focus: boolean = false;

	@Input()
	set focus(focus: boolean) {
		this._focus = focus;
		this.focusChange.emit(this.focus);
	}

	get focus(): boolean {
		return this._focus;
	}
}
