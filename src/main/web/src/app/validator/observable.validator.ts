import {
	AbstractControl,
	ValidationErrors,
	AsyncValidatorFn
} from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function validateObservable<T>(
	observable: (AbstractControl) => Observable<T>,
	resolver: (result: T) => ValidationErrors | undefined,
	debounce: number = 500
): AsyncValidatorFn {
	return (ctrl: AbstractControl): Observable<ValidationErrors | undefined> =>
		timer(debounce).pipe(
			switchMap(() => observable(ctrl).pipe(map(resolver)))
		);
}
