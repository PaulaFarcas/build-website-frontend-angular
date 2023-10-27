import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message: string | undefined;
  constructor(private userService:UserService){}

  ngOnInit():void{
    this.forUser();
  }

  forUser(){
    this.userService.forUser().subscribe(
      {
        next:(reponse)=>{
          console.log(reponse);
          this.message=reponse;
        },
        error:(error)=> console.log(error),
        complete:()=>console.log('completed')
      }
    );
  }
}
