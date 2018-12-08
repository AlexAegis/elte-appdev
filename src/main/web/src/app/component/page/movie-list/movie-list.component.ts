import { Router } from '@angular/router';
import { MovieService } from './../../../service/movie/movie.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ColDef, Column } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/model/api/api-response.interface';
import { MoviesResponse } from 'src/app/model/api/movies/movies.get.interface';
import { Movie } from 'src/app/model/movie/movie.interface';

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
	private gridApi;
	private gridColumnApi;

	columnDefs: Array<any> = [
		{ headerName: 'Title', field: 'name', checkboxSelection: this.isFirstColumn },
		{ headerName: 'Release', field: 'release', type: 'dateColumn' }
	];

	movies: Observable<ApiResponse<MoviesResponse>>;
	constructor(public movieService: MovieService, private router: Router) {
		this.movies = movieService.movies();
	}

	ngOnInit() {}

	@ViewChild('grid')
	grid: ElementRef;

	isFirstColumn(heyho) {
		return true;
	}

	rowSelect(even) {
		console.log('shietee');
	}
	onGridSizeChanged(params) {
		params.api.sizeColumnsToFit();
	}

	onSelectionChanged(params) {
		const selectedRows = this.gridApi.getSelectedRows();
		console.log(selectedRows);
		let selectedRowsString = '';
		selectedRows.forEach(function(selectedRow, index) {
			if (index !== 0) {
				selectedRowsString += ', ';
			}
			selectedRowsString += selectedRow.athlete;
		});
		//document.querySelector('#selectedRows').innerHTML = selectedRowsString;
	}

	clicked(event): void {
		console.log(`click ${(<ApiResponse<MoviesResponse>>event.data).id}`);
		this.router.navigate([`movies/${(<Movie>event.data).id}`]);
	}
}
