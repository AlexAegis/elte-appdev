import { Injectable } from '@angular/core';
import { Person } from '../../model/people/person.class';
import { User } from '../../model/user.class';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as IUserAvailable from '../../api/public/user/available.get.interface';
import * as IUserRegister from '../../api/public/user/register.post.interface';
import { ApiResponse } from 'src/app/api/api-response.interface';
import { ValidationErrors } from '@angular/forms';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) {}
	username: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
	username$: Observable<string> = this.username.asObservable();
	errors: ValidationErrors;

	register(user: User): Observable<ApiResponse<IUserRegister.RegisterResponse>> {
		return this.http.post<ApiResponse<IUserRegister.RegisterResponse>>(IUserRegister.url(), user);
	}

	usernameTaken(username: string): Observable<ApiResponse<IUserAvailable.UserAvailableResponse>> {
		return this.http.get<ApiResponse<IUserAvailable.UserAvailableResponse>>(IUserAvailable.url(username));
	}
}
