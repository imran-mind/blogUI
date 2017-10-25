import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  model: any = {};
  serverResponse: any;
  successAlert: Boolean = false;
  errorAlert: Boolean = false;
  existAlert: Boolean = false;
  alertMessage: string;
  error: any;
  types: string[] = [
    'Technoloy',
    'Education',
    'Fashion & Beauty'
  ];

  constructor(private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit() {

  }

  createCategory() {
    this.categoriesService.createCategory(this.model)
      .then(res => {
        this.serverResponse = res;
        if (this.serverResponse.statusCode === 409) {
          this.existAlert = true;
          this.alertMessage = this.serverResponse.message;
          setTimeout(() => {
            this.existAlert = false;
          }, 2000);
          console.log('name is already exit');
        }
        if (this.serverResponse.statusCode === 500) {
          console.log('Something went wrong');
          this.errorAlert = false;
          this.alertMessage = 'Something went wrong,please try again';
        }
        if (this.serverResponse.statusCode === 201) {
          console.log('Successfully Execute');
          // this.router.navigate(['/categories']);
          this.successAlert = true;
          setTimeout(() => {
            this.successAlert = false;
          }, 2000);
          this.alertMessage = this.serverResponse.message;
        }
      })
      .catch(error => {
        this.error = error;
      });
  }
}
