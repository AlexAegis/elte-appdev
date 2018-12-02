import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
/**
 * Used to override the default state matcher in material elements
 *
 * This class determines when a input field is 'red'
 */
export class ParentErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const formErrors = !!(form && form.errors);
		const controlTouched = !!(control && control.dirty && control.touched);
		const controlInvalid = !!(
			control && control.invalid
		); /*
		const parentInvalid = !!(
			control &&
			control.parent &&
			control.parent.errors &&
			formErrors
		&&
			(control.parent.dirty || control.parent.touched)) ;*/

		return (controlTouched && controlInvalid) || formErrors;
	}
}
