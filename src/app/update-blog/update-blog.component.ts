import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  serverResponse: any;
  successAlert: Boolean = false;
  errorAlert: Boolean = false;
  alertMessage: string;
  error: any;
  id: string;
  blog: any = {};
  constructor(private blogsService: BlogsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        console.log('....................', this.id);
      });
    this.blogsService.getblogById(this.id)
      .then(response => {
        this.serverResponse = response;
        console.log(this.serverResponse);
        if (this.serverResponse.statusCode === 200) {
          this.blog = this.serverResponse.data;
        }
        else {
        }
      })
      .catch();
  }
  updateBlog() {
    const blogInfo: any = {
      name: this.blog.name,
      title: this.blog.title,
      subtitle: this.blog.subtitle,
      content: this.blog.content
    };
    this.blogsService.updateBlog(this.id, blogInfo)
      .then(response => {
        this.serverResponse = response;
        if (this.serverResponse.statusCode === 200) {
          this.successAlert = true;
          this.alertMessage = 'blog successfully created';
          setTimeout(() => {
            this.successAlert = false;
          }, 2000);
        }
        else {
          this.errorAlert = true;
          this.alertMessage = "somthing Wrong,please try again";
        }
      })
      .catch(error => {
        this.error = error;
        this.errorAlert = true;
        this.alertMessage = "somthing Wrong,please try again";


      })

  }

}
