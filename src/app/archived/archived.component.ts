import { Component, OnInit } from '@angular/core';
import {ArchivedService} from '../archived.service';

@Component({
	selector: 'app-archived',
	templateUrl: './archived.component.html',
	styles: [`
		[name=fName].ng-invalid{
			border-left: 5px solid red;
		}
		[name=fName].ng-valid{
			border-left: 5px solid green;
		}
	`]
})
export class ArchivedComponent implements OnInit {
	archivedList :Archived[];
	public firstName:string='michal';
	constructor(private archivedService:ArchivedService) { }

	ngOnInit() {
		this.getArchivedList();
	}

	getArchivedList():void{
		this.archivedService.getArchivedList().
		then(archivedList=>this.archivedList=archivedList);
	}

	public formSubmit(data:any):void{
		console.log('-------DATA-------',data);
	}

}


interface Archived{
	id:number,
	name:string,
	createdAt:Date
}