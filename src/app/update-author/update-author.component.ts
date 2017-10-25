import { Component, OnInit,OnDestroy } from '@angular/core';
import{Router,ActivatedRoute,ParamMap} from '@angular/router';
import{AuthorsService} from '../authors.service';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.css']
})
export class UpdateAuthorComponent implements OnInit {
  id:string;
  model:any;
  serverResponse: any;
  successAlert: Boolean = false;
  errorAlert: Boolean = false;
  alertMessage: string;
  error: any;
  constructor(private authorsService:AuthorsService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params=>{
        this.id=params['id'];
        console.log('this is author id',this.id);
        });


        this.authorsService.getAuthorById(this.id)
        .then(res=>{
          this.serverResponse=res;
          if(this.serverResponse.statusCode===200){
            console.log('succsess');
            this.model=this.serverResponse.data;
          }
        })
  }
  
  updateAuthor() {
    const authorInfo: any = {
      name: this.model.name,
      mobile: this.model.mobile,
      email:this.model.email
    };
    this.authorsService.updateAuthor(this.id, authorInfo)
      .then(response => {
        this.serverResponse = response;
        if (this.serverResponse.statusCode === 200) {
          this.successAlert = true;
          this.alertMessage = 'author updated successfully';
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
  
}
