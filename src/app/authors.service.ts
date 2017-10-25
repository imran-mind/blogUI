import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthorsService {
	authorUrl: string = "http://localhost:3200/blogs/authors";
	constructor(private http: Http) { }

	getAuthor(): Promise<any> {
		return this.http.get(this.authorUrl)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}
	creatAuhtors(author: any): Promise<any> {
		return this.http.post(this.authorUrl, author)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);

	}
	updateAuthor(id:string,authorInfo:any): Promise<any>{
		let authtoken=localStorage.getItem('token');
		let headers= new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Authorization',authtoken);
		let options = new RequestOptions({headers:headers});
		return this.http.put(this.authorUrl+'/'+id,authorInfo,options)
		.toPromise()
		.then(res=>res.json())
		.catch(this.handleError);

	}
	deleteAuthorById(id: string): Promise<any>	{
		let authtoken=localStorage.getItem('token');
		let headers=new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization',authtoken);
		let options=new RequestOptions({headers:headers});
		return this.http.delete(this.authorUrl+'/'+id,options)
		.toPromise()
		.then(res=>res.json())
		.catch(this.handleError);
	}
	getAuthorById(id:string):Promise <any>{
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', authToken);

		let options = new RequestOptions({ headers: headers });
		return this.http.get(this.authorUrl + '/' + id, options)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
		
	}
	private handleError(res: any): Promise<any> {
		console.log('Error while fetch author data', res);
		return Promise.reject(res.message || res);
	}
}


