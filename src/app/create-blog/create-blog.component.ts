import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  model: any = {};
  serverResponse: any;
  error: any;
  constructor(private blogsService: BlogsService, private router: Router) { }

  ngOnInit() {
  }

  createBlog() {
    this.blogsService.createBlog(this.model)
      .then(res => {
        this.serverResponse = res;

        if (this.serverResponse.statusCode === 409) {
          console.log('blog name is already exist');
        }
        if (this.serverResponse.statusCode !== 201) {
          console.log('Create bloger is wrong');

        }
        if (this.serverResponse.statusCode === 201) {
          console.log('create blog is succcess fully');
          this.router.navigate(['/blogs']);
        }

      })
      .catch(error => {
        this.error = error;
      });
  }
}
