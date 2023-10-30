import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {

  constructor(private userService:UserService,
    private router:Router){}

  register(registerForm:NgForm){
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe({
      next:(response)=>
        this.router.navigate(['/login']),
      error:(error)=>{
        console.log(error);
      },
      complete:()=>console.log("complete")
    }
    
    );
  }
}
