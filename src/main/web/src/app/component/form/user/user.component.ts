import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../model/user.class';
import { AuthService } from 'src/app/service/auth.service';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	@Input()
	user: User;

	expiration: Moment = this.auth.getAccessTokenExpiration();
	time$: Observable<Moment> = timer(0, 1000).pipe(map(() => moment()));

	constructor(
		private http: HttpClient,
		public auth: AuthService,
		private router: Router,
		private route: ActivatedRoute,
		private authGuard: AuthGuard
	) {}

	ngOnInit() {
		console.log(this.user);
	}

	logout() {
		this.auth.logout();

		this.router.navigate(['']);
	}
}
