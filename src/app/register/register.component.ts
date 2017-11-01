import { Component, OnInit, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  model: any = {};
  error: any;
  serverResponse: any;
  successAlert: Boolean = false;
  alertMessage: any;

  constructor(private loginService: LoginService, private http: Http,
    private router: Router, private el: ElementRef) { }

  ngOnInit() {
  }

  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    console.log("iam+ " + inputEl);
    let fileCount: number = inputEl.files.length;
    console.log('.................', inputEl.files);

    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      console.log('-----file----', fileCount);
      for (let i = 0; i < fileCount; i++) {
        formData.append('photo', inputEl.files.item(i));

      }
      this.http
        .put('http://localhost:3200/blogs/users/file/upload', formData).map((res: any) => res).subscribe(
        (success) => {
          alert(success._body);
        },
        (error) => alert(error)
        );
    }
  }


  register() {

    this.loginService.registerUser(this.model)
      .then(user => {
        this.serverResponse = user;
        console.log('--------------------', this.serverResponse);
        if (this.serverResponse.statusCode !== 201) {
          console.log('user not resiterd');
        }
        if (this.serverResponse.statusCode === 201) {
          console.log(this.serverResponse.message);

          this.successAlert = true;
          this.alertMessage = "successfully created";
          setTimeout(() => {

            this.router.navigate(['/']);
          }, 2000);
        }
      })
      .catch(error => {
        console.log('--------Error-In-SignUp----------');
      });
  }


}
