import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {

  model: any = {};
  serverResponse: any;
  error: any;
  successAlert: Boolean = false;
  errorAlert: Boolean = false;
  alreadyAlert: Boolean = false;
  alertMessage: string;
  constructor(private authorsService: AuthorsService, private router: Router) { }

  ngOnInit() {
  }

  createAuthor() {

    this.authorsService.creatAuhtors(this.model)
      .then(res => {
        this.serverResponse = res;
        if (this.serverResponse.statusCode === 409) {
          console.log('aleady Created');
          this.alreadyAlert = true;
          setTimeout(() => {
            this.alreadyAlert = false;
          }, 2000);
          this.alertMessage = this.serverResponse.message;
        }
        if (this.serverResponse.statusCode === 500) {
          console.log('Something went wrong');
          this.errorAlert = false;
          this.alertMessage = 'Something went wrong,please try again';
        }
        if (this.serverResponse.statusCode === 201) {
          console.log('Successfully Execute');
          this.successAlert = true;
          setTimeout(() => {
            this.successAlert = false;
            this.model = {};
          }, 2000);
          this.alertMessage = this.serverResponse.message;
        }
      })
      .catch(error => {
        this.error = error;
      });
  }
}
