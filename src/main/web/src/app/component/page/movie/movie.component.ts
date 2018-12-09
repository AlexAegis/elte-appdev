import { Subscription, Observable } from 'rxjs';
import { MovieService } from './../../../service/movie/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MovieFormComponent } from '../../form/movie-form/movie-form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { mergeMap, switchMap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/api/api-response.interface';
import { MovieResponse } from 'src/app/api/movies/movies.get.interface';
import { Movie } from 'src/app/model/movie/movie.interface';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
	constructor(
		public activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private movieService: MovieService
	) {}

	movieForm: FormGroup;

	@ViewChild('movieForm')
	movieFormComponent: MovieFormComponent;
	movieFromParam: Observable<Movie>;
	ngOnInit(): void {
		this.movieForm = this.formBuilder.group({});
		this.movieFromParam = this.activatedRoute.params.pipe(
			switchMap(params => this.movieService.movie(params['id']))
		);
		this.movieFromParam.subscribe(result => {
			this.movieForm.patchValue({ movie: result });
		});
	}

	save(): void {
		console.log('save called');
	}

	ngOnDestroy(): void {}
}
