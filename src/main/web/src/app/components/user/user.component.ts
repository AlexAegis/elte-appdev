import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
	constructor(private http: HttpClient, private userService: UserService, private auth: AuthService) {}

	ngOnInit() {}

	ngOnDestroy() {}

	async logout() {
		return await this.auth.logout();
	}
}
