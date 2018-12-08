import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/api/api-response.interface';

import * as IMovie from '../../model/api/movies/movies.get.interface';
@Injectable({
	providedIn: 'root'
})
export class MovieService {
	constructor(private http: HttpClient) {}

	movies(): Observable<ApiResponse<IMovie.MoviesResponse>> {
		return this.http.get<ApiResponse<IMovie.MoviesResponse>>(IMovie.url);
	}
}
