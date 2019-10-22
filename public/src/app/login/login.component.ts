import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  email :string;
  password :string;

  constructor(public authService:AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    let auth = {
      email:this.email,
      password: this.password
    }
    this.authService.signIn(auth).subscribe((res:any)=>{
      if (typeof(res.status)=="undefined") alert("Invalid Email or Password, please try again")
      else{
        console.log("---------------",this.authService.id);
        console.log("---------------",this.authService.name);
        this.authService.id = res.id;
        this.authService.name=res.name;
        console.log("---------------",this.authService);
        
      }
    });
  }

}
