import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/api/api-response.interface';

import * as IMovie from '../../api/movies/movies.get.interface';
import * as ITitleAvailable from '../../api/movies/title-available.get.interface';
@Injectable({
	providedIn: 'root'
})
export class MovieService {
	constructor(private http: HttpClient) {}

	movies(): Observable<ApiResponse<IMovie.MoviesResponse>> {
		return this.http.get<ApiResponse<IMovie.MoviesResponse>>(IMovie.url);
	}

	titleAvailable(id: number): Observable<ApiResponse<ITitleAvailable.TitleAvailableResponse>> {
		return this.http.get<ApiResponse<ITitleAvailable.TitleAvailableResponse>>(ITitleAvailable.url(id));
	}
}
