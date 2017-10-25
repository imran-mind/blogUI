import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CategoriesService {
	categoryUrl: string = "http://localhost:3200/blogs/categories";

	constructor(private http: Http) { }
	getCategries(): Promise<any> {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', authToken);

		let options = new RequestOptions({ headers: headers });
		console.log('*******************************************');
		//console.log(JSON.stringify(config));
		return this.http.get(this.categoryUrl, options)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);

	}
	createCategory(category: any): Promise<any> {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', authToken);

		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.categoryUrl, category, options)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	getCategoryById(id: string): Promise<any> {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', authToken);

		let options = new RequestOptions({ headers: headers });
		return this.http.get(this.categoryUrl + '/' + id, options)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	updateCategory(id: string, categoryInfo: any): Promise<any> {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', authToken);
		let options = new RequestOptions({ headers: headers });
		
		return this.http.put(this.categoryUrl + '/' + id, categoryInfo, options)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	deleteCategoryById(id: string): Promise<any> {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', authToken);

		let options = new RequestOptions({ headers: headers });
		return this.http.delete(this.categoryUrl + '/' + id, options)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}

	private handleError(res: any): Promise<any> {
		console.log('error while fetching category data', res);
		return Promise.reject(res.message || res);

	}

}

export interface Categories {
	id: string;
	name: string;
	type: string;
}