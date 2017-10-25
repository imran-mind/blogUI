import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorsService } from '../authors.service';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  response: any;
  model: any = {};
  error: any;
  serverResponse: any;
  successAlert: Boolean = false;
  errorAlert: Boolean = false;
  alertMessage: string;
  constructor(private authorsService: AuthorsService) { }

  getAuthors(): void {
    this.authorsService.getAuthor()
      .then(serverResponse => {
        this.response = <any>serverResponse;
        if (this.response.statusCode !== 200) {
          this.error = this.response.message;
        }
        if (this.response.data.lenght === 0) {
          this.error = 'Author not found';
        }
        if (this.response.statusCode === 200) {
          this.authors = this.response.data;
        }
      }
      )
      .catch(error => this.error = error);
  }
  
  deleteAuthorById(id: string) {
    this.authorsService.deleteAuthorById(id)
      .then(response => {
        this.serverResponse = response;
        if (this.serverResponse.statusCode === 200) {
          this.successAlert = true;
          this.alertMessage = 'Delete Succesfully';
          this.getAuthors();
          setTimeout(() => {
            this.successAlert = false;
          }, 2000)
        }
        else {
          this.errorAlert = true;
          this.alertMessage = 'something went wrong,please try again';
          setTimeout(() => {
            this.errorAlert = false;
          }, 2000)
        }

      })
      .catch(error => {
        this.error = error;
        this.alertMessage = 'something went wrong,please try again';
        setTimeout(() => {
          this.errorAlert = false;
        }, 2000)
      })
  }

  ngOnInit() {
    this.getAuthors();
  }

}


interface Author {
  id: number,
  name: string,
  mobile: number,
  email: string
}
