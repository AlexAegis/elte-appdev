import { Subscription, UnsubscriptionError } from 'rxjs';
import { MovieService } from 'src/app/service/movie/movie.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	constructor(public auth: AuthService, public movieService: MovieService) {}

	count: number;
	countOwn: number;

	unsub: Array<Subscription> = [];

	ngOnInit() {
		this.unsub.push(
			this.movieService.count().subscribe(
				res => {
					this.count = res.data;
				},
				err => {
					this.count = undefined;
				}
			)
		);

		this.unsub.push(
			this.movieService.countOwn().subscribe(res => {
				this.countOwn = res.data;
			})
		);
	}

	whoami(): any {
		console.log('whoami');
		this.auth.queryCurrentUser().subscribe(observable => {
			console.log(observable);
		});
	}

	ngOnDestroy(): void {
		this.unsub.forEach(sub => sub.unsubscribe());
	}
}
