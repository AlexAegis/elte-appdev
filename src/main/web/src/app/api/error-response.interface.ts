import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from './api-response.interface';

export interface ErrorResponse<T> extends HttpErrorResponse {
	error: ApiResponse<T>;
}
