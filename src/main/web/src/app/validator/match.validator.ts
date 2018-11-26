import { AbstractControl, ValidatorFn } from '@angular/forms';
export function matchValidator(
	a: string,
	b: string,
	condition: boolean = true
): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const aControl = control.get(a);
		const bControl = control.get(b);
		return !condition ||
			(aControl && bControl && aControl.value === bControl.value)
			? undefined
			: { match: false };
	};
}
