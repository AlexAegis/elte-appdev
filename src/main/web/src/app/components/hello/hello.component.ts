import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'hello',
	templateUrl: './hello.component.html',
	styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
	constructor(private http: HttpClient, private authService: AuthService) {}

	ngOnInit() {
		console.log('log hello');
	}

	async queryCurrentUser() {
		console.log('log hello');
		const result = await this.authService.queryCurrentUser();
		console.log(JSON.stringify(result));
		return result;
	}
}
