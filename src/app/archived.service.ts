import { Injectable } from '@angular/core';

const archivedList :Archived[]=[
{
	id:123,
	name:"kk blogs",
	createdAt:new Date()
},
{
	id:124,
	name:"Silver's blogs",
	createdAt:new Date()
},
{
	id:125,
	name:"Bagul's blogs",
	createdAt:new Date()
}
]


@Injectable()
export class ArchivedService {

	constructor() { }

	getArchivedList() :Promise<Archived[]>{
		return Promise.resolve(archivedList);
	}

}




interface Archived{
	id:number,
	name:string,
	createdAt:Date
}