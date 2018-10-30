import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'hello',
	templateUrl: './hello.component.html',
	styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
	cu;
	constructor(private http: HttpClient, private userService: UserService) {}

	ngOnInit() {
		this.cu = this.queryCurrentUser();
	}

	async queryCurrentUser() {
		const result = await this.userService.queryCurrentUser();
		console.log(result);
		console.log(JSON.stringify(result));
		return result;
	}
}
