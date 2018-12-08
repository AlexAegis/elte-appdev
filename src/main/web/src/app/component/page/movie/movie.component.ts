import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieFormComponent } from '../../form/movie-form/movie-form.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
	constructor(public activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {}

	movieForm: FormGroup;

	@ViewChild('movieForm')
	movieFormComponent: MovieFormComponent;

	ngOnInit(): void {
		this.movieForm = this.formBuilder.group({});
	}

	save(): void {
		console.log('save called');
	}
}
