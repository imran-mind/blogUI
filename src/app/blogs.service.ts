import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Blog } from './blogs/blog';

@Injectable()
export class BlogsService {

	private httpUrl = 'http://localhost:3200/blogs/blogs';
	// blogs:Blog[];

	constructor(private http: Http) { }


	/*first approach for hitting Http REST api
	  fetching blogs from server
	*/
	/*getBlogs():Observable<Blog[]>{
		return this.http.get(this.httpUrl)httpUrl
		.map(this.extractData)
		.catch(this.handleError);
	}*/

	/*first approach for hitting Http REST api
	  fetching blogs from server
	*/
	getBlogs(): Promise<Blog[]> {
		return this.http.get(this.httpUrl)
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}
	createBlog(blog: any): Promise<any> {
		return this.http.post(this.httpUrl, blog)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError);
	}
	getblogById(id:string):Promise<any>{
		let authToken=localStorage.getItem('token');
		let headers=new Headers({'Accept':'application/json'});
		headers.append('Authorization',authToken);
		let options=new RequestOptions({headers:headers});
		return this.http.get(this.httpUrl +'/'+ id,options)
		.toPromise()
		.then(res=>res.json())
		.catch(this.handleError);
	}
	updateBlog(id:string,blogInfo:any):Promise<any>{
		let authToken=localStorage.getItem('token');
		let headers=new Headers({'Accept':'application/json'});
		headers.append('Authorization',authToken);
		let options=new RequestOptions({headers:headers});
		return this.http.put(this.httpUrl+'/'+ id,blogInfo,options)
		.toPromise()
		.then(res=>res.json())
		.catch(this.handleError);

	}
	deleteBlogById(id:string):Promise<any>{
		let authToken=localStorage.getItem('token');
		let headers =new Headers({'Accept':'application/json'});
		headers.append('Authorization',authToken);
		let options=new RequestOptions({headers:headers});
		return this.http.delete(this.httpUrl+'/'+id,options)
		.toPromise()
		.then(res=>res.json())
		.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		console.log('*********************');
		console.log(body);
		return body || {};
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred*********', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
