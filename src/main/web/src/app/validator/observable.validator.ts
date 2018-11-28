import {
	AbstractControl,
	ValidationErrors,
	AsyncValidatorFn
} from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Generic async validator creator for observables
 *
 * @param observable a funcion which returns an observable based on the control
 * @param resolver a function which resolves the result of the observable
 * @param debounce time, prevents server stress
 */
export function validateObservable<T>(
	observable: (control: AbstractControl) => Observable<T>,
	resolver: (result: T) => ValidationErrors | undefined,
	debounce: number = 500
): AsyncValidatorFn {
	return (ctrl: AbstractControl): Observable<ValidationErrors | undefined> =>
		timer(debounce).pipe(
			switchMap(() => observable(ctrl).pipe(map(resolver)))
		);
}
