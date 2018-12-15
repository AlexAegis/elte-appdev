import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/api/api-response.interface';

import * as IMovie from '../../api/movies/movies.get.interface';
import * as ITitleAvailable from '../../api/movies/title-available.get.interface';
import { Movie } from 'src/app/model/movie/movie.interface';
@Injectable({
	providedIn: 'root'
})
export class MovieService {
	constructor(private http: HttpClient) {}

	movies(): Observable<ApiResponse<IMovie.MoviesResponse>> {
		return this.http.get<ApiResponse<IMovie.MoviesResponse>>(IMovie.url());
	}

	titleAvailable(id: number): Observable<ApiResponse<ITitleAvailable.TitleAvailableResponse>> {
		return this.http.get<ApiResponse<ITitleAvailable.TitleAvailableResponse>>(ITitleAvailable.url(id));
	}

	movie(id: number = undefined): Observable<Movie> {
		return this.http.get<Movie>(IMovie.url(id));
	}

	save(movie: Movie): Observable<Movie> {
		console.log(movie);
		return this.http.post<Movie>('rest/movies/', movie);
	}

	count(): Observable<ApiResponse<number>> {
		return this.http.get<ApiResponse<number>>(IMovie.url() + 'count');
	}

	countOwn(): Observable<ApiResponse<number>> {
		return this.http.get<ApiResponse<number>>(IMovie.url() + 'count-own');
	}
}
