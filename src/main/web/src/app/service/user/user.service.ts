import { Injectable } from '@angular/core';
import { Person } from '../../model/people/person.class';
import { User } from '../../model/user.class';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) {}

	register(user: User): void {
		console.log(`register service! ${JSON.stringify(user)}`);
		this.http
			.post<User>('rest/public/user/register', user)
			.subscribe(res => console.log(res), err => console.log(err));
	}

	usernameTaken(username: string): Observable<boolean> {
		return this.http.get<boolean>(`rest/public/user/name/${username}`);
	}
}
