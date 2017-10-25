import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
	loginUrl = "http://localhost:3200/blogs/users/signin";
	registerUrl = "http://localhost:3200/blogs/users/signup";
	
	constructor(private http: Http) { }

	userLogin(user: any): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		//let options = new RequestOptions({ headers: headers });
		return this.http.post(this.loginUrl, user, headers)
			.map(this.extractData)
			.catch(this.handleErrorObservable);
	}

	registerUser(user: any): Promise<any> {
		console.log('-------model--------------');
		console.log(user);
		return this.http.post(this.registerUrl,user)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		console.log('*********************');
		console.log(body);
		return body || {};
	}

	private handleErrorObservable(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
	}
	private handleError(error: any): Promise<any> {
		console.error('An error occurred*********', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
