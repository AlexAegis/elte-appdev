import { ValidationErrors } from '@angular/forms';
import { ErrorResponse } from '../api/error-response.interface';

export function errorResponseConverter<T>(err: any): ValidationErrors {
	const errors = [];
	(<ErrorResponse<T>>err).error.messages.forEach(me => {
		errors[me.message] = true;
	});
	return errors;
}
