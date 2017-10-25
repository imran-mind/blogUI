import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  error: any;
  serverResponse: any;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
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
          this.router.navigate(['/']);
        }
      })
      .catch(error => {
        console.log('--------Error-In-SignUp----------');
      });
  }


}
