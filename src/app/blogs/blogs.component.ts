import { Component, OnInit } from '@angular/core';
import {BlogsService} from '../blogs.service';
import {Blog} from './blog';

@Component({
	selector: 'app-blogs',
	templateUrl: './blogs.component.html',
	styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

	blogs:Blog[];
	err:string;
	response:any;
	
	constructor(private blogsService:BlogsService) { }

	ngOnInit() {
		this.getBlogs();
	}


	//first approach for handing server response
	/*getBlogs():void{
		this.blogsService.getBlogs()
		.subscribe(blogs=>{
			this.response = <any>blogs;
			if(this.response.statusCode!=200){
				this.err= this.response.message;
			}
			if(this.response.data.length===0){
				this.err ="Blogs Not Found";
			}
			if(this.response.statusCode===200 ){
				this.blogs = this.response.data;	
			}
			console.log('--------------------------');
			console.log(this.blogs);
		},err=>{});
		//.catch(	err=>this.err=err);
	}*/

	//second approach for handing server response
	getBlogs():void{
		this.blogsService.getBlogs()
		.then(serverResponse=>{
			this.response =serverResponse;
			this.response = <any>serverResponse;
			if(this.response.statusCode!=200){
				this.err= this.response.message;
			}
			if(this.response.data.length===0){
				this.err ="Blogs Not Found";
			}
			if(this.response.statusCode===200 ){
				this.blogs = this.response.data;	
			}
		})
		.catch(err=>{
			this.err=err;
		});
	}
}