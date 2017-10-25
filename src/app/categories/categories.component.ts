import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories.service';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

	categories: Categories[];
	response: any;
	serverResponse: any;
	successAlert: Boolean = false;
	errorAlert: Boolean = false;
	notFoundAlert: Boolean = false;
	alertMessage: string;
	notFoundError: any;
	error: any;
	constructor(private router: Router, private categoriesService: CategoriesService) { }


	getCategories(): void {
		this.categoriesService.getCategries()
			.then(serverResponse => {
				this.response = serverResponse;
				this.response = <any>serverResponse;
				console.log('-----------------------');
				console.log(this.response);
				if (this.response.statusCode === 401) {
					this.router.navigate(['/']);
				}
				if (this.response.statusCode !== 200) {
					this.error = this.response.message;
				}
				if (this.response.data.length === 0) {
					this.notFoundError = 'Categories Not Found';
					this.notFoundAlert = true;
				}
				if (this.response.statusCode === 200) {
					this.categories = this.response.data;
				}
			})
			.catch(error => this.error = error);
	}


	deleteCategoryById(id: string) {
		console.log('*******************');
		console.log(id);
		console.log('*******************');
		this.categoriesService.deleteCategoryById(id)
			.then(response => {
				this.serverResponse = response;
				if (this.serverResponse.statusCode === 200) {
					this.successAlert = true;
					this.alertMessage = 'deleted successfully..';
					this.getCategories();
					setTimeout(() => {
						this.successAlert = false;
					}, 2000);
				} else {
					this.errorAlert = true;
					this.alertMessage = 'something went wrong,please try again';
					setTimeout(() => {
						this.errorAlert = false;
					}, 2000);
				}
			})
			.catch(error => {
				this.error = error;
				this.errorAlert = true;
				this.alertMessage = 'something went wrong,please try again';
				setTimeout(() => {
					this.errorAlert = false;
				}, 2000);
			});
	}

	ngOnInit() {
		this.getCategories();
	}

	loadPage(): void {
		this.router.navigate(['categories']);
	}
}

export interface Categories {
	id: string;
	name: string;
	type: string;
}
