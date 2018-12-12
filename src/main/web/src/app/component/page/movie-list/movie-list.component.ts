import { GridEvent } from './../../../type/ag-grid-event.type';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from './../../../service/movie/movie.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ColDef, Column, GridApi, RowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/api/api-response.interface';
import { MoviesResponse } from 'src/app/api/movies/movies.get.interface';
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
		{ headerName: 'Title', field: 'title', checkboxSelection: this.isFirstColumn },
		{ headerName: 'Release', field: 'release', type: 'dateColumn' }
	];

	movies: Observable<ApiResponse<MoviesResponse>>;
	constructor(public movieService: MovieService, private router: Router, private activatedRoute: ActivatedRoute) {
		this.movies = movieService.movies();
	}

	rowClassRules;
	ngOnInit() {}

	@ViewChild('grid')
	grid: ElementRef;

	isFirstColumn(heyho): boolean {
		return true;
	}

	rowSelect(event: GridEvent): void {
		console.log('shietee');
	}
	onGridSizeChanged(params: GridEvent): void {
		params.api.sizeColumnsToFit();
	}

	onSelectionChanged(params: GridEvent): void {
		const selectedRows = params.api.getSelectedRows();
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
		this.router.navigate([`movies/${(<Movie>event.data).id}`]);
	}

	gridReady(event: GridEvent): void {
		this.activatedRoute.queryParams.subscribe(queryParams => {
			console.log('LAST');
			console.log(queryParams);
			this.rowClassRules = {
				flashlit: function(gridParams) {
					return gridParams.data.id === Number(queryParams.last);
				}
			};

			event.api.paginationGoToPage(
				Math.floor(Number(queryParams.last) / event.api.paginationGetPageSize() - 1) + 1
			);
		});
	}

	getRowNodeId(data): number {
		return data.id;
	}
}
