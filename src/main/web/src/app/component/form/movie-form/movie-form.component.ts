import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiResponse } from 'src/app/model/api/api-response.interface';
import { validateObservable } from 'src/app/validator/observable.validator';
import { MovieService } from 'src/app/service/movie/movie.service';
import { TitleAvailableResponse } from 'src/app/model/api/movies/title-available.get.interface';

@Component({
	selector: 'app-movie-form',
	templateUrl: './movie-form.component.html',
	styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
	constructor(private formBuilder: FormBuilder, public movieService: MovieService) {}

	@Input()
	parent: FormGroup;

	movie: FormGroup;

	titleFocused: boolean;

	ngOnInit() {
		this.titleFocused = true;
		this.movie = this.formBuilder.group({
			title: [
				'',
				[Validators.required],
				[
					validateObservable<ApiResponse<TitleAvailableResponse>>(
						(ctrl: AbstractControl) => this.movieService.titleAvailable(ctrl.value),
						(result: ApiResponse<TitleAvailableResponse>) =>
							result.data.available ? undefined : { taken: false },
						200
					)
				]
			],
			release: ['', []]
		});
		this.parent.addControl('movie', this.movie);
	}
}
