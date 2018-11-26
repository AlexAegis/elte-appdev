import { AbstractControl, ValidatorFn } from '@angular/forms';
export function requiredIf(condition: boolean): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		return condition || (control && control.value !== undefined)
			? undefined
			: { empty: true };
	};
}
