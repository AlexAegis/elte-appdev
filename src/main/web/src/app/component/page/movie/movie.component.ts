import { Subscription, Observable, of } from 'rxjs';
import { MovieService } from './../../../service/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MovieFormComponent } from '../../form/movie-form/movie-form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { mergeMap, switchMap, defaultIfEmpty } from 'rxjs/operators';
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
		private movieService: MovieService,
		private router: Router
	) {}

	movieForm: FormGroup;

	@ViewChild('movieForm')
	movieFormComponent: MovieFormComponent;
	movieFromParam: Observable<Movie>;
	unsub: Array<Subscription> = [];

	ngOnInit(): void {
		this.movieForm = this.formBuilder.group({});
		this.movieFromParam = this.activatedRoute.params.pipe(
			switchMap(params => {
				if (params && params['id']) {
					return this.movieService.movie(params['id']);
				} else of();
			}),
			defaultIfEmpty()
		);
		this.unsub.push(
			this.movieFromParam.subscribe(result => {
				if (result) {
					this.movieForm.patchValue({ movie: result });
				}
			})
		);
	}

	save(): void {
		let o = this.movieForm.value;
		this.unsub.push(
			this.movieService.save(this.movieForm.value.movie).subscribe(
				movie => this.router.navigate(['movies'], { queryParams: { last: movie.id } }),
				err => {
					console.log(`errored: ${err}`);
					console.log(err);
				}
			)
		);
		console.log('save called');
	}

	ngOnDestroy(): void {
		this.unsub.forEach(sub => {
			sub.unsubscribe();
		});
	}
}
