import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from './user';
import { LoginService } from '../login.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // user: User;
  errorMessage: String;
  customResponse: CustomResponse;
  login: any = {};
  errorAlert: Boolean = false;
  unauthorizeUser: any;

  constructor(private router: Router, private loginService: LoginService) { }


  ngOnInit() {
  }

  userLogin() {
    this.loginService.userLogin(this.login)
      .subscribe(res => {
        this.customResponse = <any>res;
        console.log(this.customResponse);
        if (this.customResponse) {
          if (this.customResponse.statusCode === 401) {
            console.log('..........invalid........');
            this.router.navigate(['/']);
            this.errorAlert = true;
            this.unauthorizeUser = "invalid user name or pasword";
          }
          if (this.customResponse.statusCode === 200) {
            localStorage.setItem('token', 'Bearer ' + this.customResponse.token);
            localStorage.setItem('name', this.customResponse.name);
            console.log(localStorage.getItem('token'));
            console.log(localStorage.getItem('name'));
            this.router.navigate(['dashboard']);
          } else {
            this.router.navigate(['']);
          }
        }
      },
      error => {
        this.errorMessage = <any>error
        console.log('------------------------caught error-------------------', JSON.stringify(this.errorMessage));
      });
  }
}


interface CustomResponse {
  statusCode: number;
  token: string;
  message: string;
  name: string;
}

