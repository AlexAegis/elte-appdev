import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { log } from 'util';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) {}
}
