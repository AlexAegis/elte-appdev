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

	username: string;

	register(user: User): Observable<User> {
		return this.http.post<User>('rest/public/user/register', user);
	}

	usernameTaken(username: string): Observable<boolean> {
		return this.http.get<boolean>(`rest/public/user/name/${username}`);
	}
}
