import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ApiResponse } from 'src/app/api/api-response.interface';
import { validateObservable } from 'src/app/validator/observable.validator';
import { MovieService } from 'src/app/service/movie/movie.service';
import { TitleAvailableResponse } from 'src/app/api/movies/title-available.get.interface';
import { PersonComponent } from '../people/person/person.component';

@Component({
	selector: 'app-movie-form',
	templateUrl: './movie-form.component.html',
	styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
	constructor(private formBuilder: FormBuilder, public movieService: MovieService, private cd: ChangeDetectorRef) {}

	@Input()
	parent: FormGroup;

	movie: FormGroup;

	get formActors() {
		return <FormArray>this.movie.controls['actors'];
	}

	titleFocused: boolean;

	ngOnInit() {
		this.titleFocused = true;
		this.movie = this.formBuilder.group({
			id: ['', []],
			title: [
				'',
				[Validators.required],
				[
					validateObservable<ApiResponse<TitleAvailableResponse>>(
						(ctrl: AbstractControl) => this.movieService.titleAvailable(ctrl.value),
						(result: ApiResponse<TitleAvailableResponse>) =>
							result.data.available ? { taken: true } : undefined,
						200,
						false
					)
				]
			],
			release: ['', []],
			actors: this.formBuilder.array([])
		});
		this.parent.addControl('movie', this.movie);
	}

	addActor(): void {
		const actorsArray: FormArray = this.movie.get('actors') as FormArray;
		const actorGroup: FormGroup = this.formBuilder.group({ person: PersonComponent.create(this.formBuilder) });
		actorsArray.push(actorGroup);
	}
}
