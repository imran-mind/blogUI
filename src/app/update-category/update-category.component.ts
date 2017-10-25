import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from '../categories.service';


@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {

  serverResponse: any;
  successAlert: Boolean = false;
  errorAlert: Boolean = false;
  alertMessage: string;
  error: any;
  id: string;
  categoy: any;

  types: string[] = [
    'Technoloy',
    'Education',
    'Fashion & Beauty'
  ];
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    console.log('**********updateCategory**********');
    console.log(this.activatedRoute.params);
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        console.log('----------------> ', this.id);
      });

    this.categoriesService.getCategoryById(this.id)
      .then(response => {
        this.serverResponse = response;
        if (this.serverResponse.statusCode === 200) {
          this.categoy = this.serverResponse.data;
        } else {

        }
      })
      .catch();
  }



  updateCategory() {
    const categoryInfo: any = {
      name: this.categoy.name,
      type: this.categoy.type
    };
    this.categoriesService.updateCategory(this.id, categoryInfo)
      .then(response => {
        this.serverResponse = response;
        if (this.serverResponse.statusCode === 200) {
          this.successAlert = true;
          this.alertMessage = 'category updated successfully';
          setTimeout(() => {
            this.successAlert = false;
          }, 2000);
        } else {
          this.errorAlert = true;
          this.alertMessage = 'something went wrong,please try again';
        }
      })
      .catch(error => {
        this.error = error;
        this.errorAlert = true;
        this.alertMessage = 'something went wrong,please try again';
      });
  }



  ngOnDestroy() {
  }

}
