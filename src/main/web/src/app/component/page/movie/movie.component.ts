import { PersonComponent } from './../../form/people/person/person.component';
import { Subscription, Observable, of } from 'rxjs';
import { MovieService } from './../../../service/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MovieFormComponent } from '../../form/movie-form/movie-form.component';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { mergeMap, switchMap, defaultIfEmpty } from 'rxjs/operators';
import { ApiResponse } from 'src/app/api/api-response.interface';
import { MovieResponse } from 'src/app/api/movies/movies.get.interface';
import { Movie } from 'src/app/model/movie/movie.interface';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy, AfterViewInit {
	constructor(
		public activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private movieService: MovieService,
		private router: Router
	) {}

	movieForm: FormGroup;

	@ViewChild('movieForm')
	movieFormComponent: MovieFormComponent;
	movieFromParam$: Observable<Movie>;
	unsub: Array<Subscription> = [];
	existing: boolean = false;
	loaded: boolean = true;

	ngOnInit(): void {
		this.movieForm = this.formBuilder.group({});
		this.movieFromParam$ = this.activatedRoute.params.pipe(
			switchMap(params => {
				console.log('resolved!!');
				if (params && params.id) {
					this.loaded = false;
					return this.movieService.movie(params.id);
				} else return of();
			})
		);
		this.unsub.push(
			this.movieFromParam$.subscribe(result => {
				if (result) {
					console.log('yay existing!!');

					const actorsArray: FormArray = this.movieForm.get('movie').get('actors') as FormArray;

					for (let i = 0; i < result.actors.length; i++) {
						const actorGroup: FormGroup = this.formBuilder.group({
							person: PersonComponent.create(this.formBuilder)
						});
						actorsArray.push(actorGroup);
					}

					//this.movieForm.patchValue({ movie: result });

					this.existing = true;
				}
			})
		);
	}

	ngAfterViewInit(): void {
		this.unsub.push(
			this.movieFromParam$.subscribe(result => {
				this.loaded = true;
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
