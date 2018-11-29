import { FormGroup } from '@angular/forms';
import { errorResponseConverter } from './error-response-converter.function';

export function serverErrorHandler(errorDestination: FormGroup): (error: any) => void {
	return err => {
		errorDestination.setErrors(errorResponseConverter(err));
	};
}
