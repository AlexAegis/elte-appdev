import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
