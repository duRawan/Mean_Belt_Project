import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router, NavigationExtras }  from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  email :string;
  password :string;
  selectedUser:any;

  constructor(public authService:AuthService, private router: Router) { 

  }

  ngOnInit() {
    this.selectedUser={id:"", name:"",email:"" }
  }

  login(){
    let auth = {
      email:this.email,
      password: this.password
    }
    this.authService.signIn(auth).subscribe((res:any)=>{
      if (typeof(res.status)=="undefined") alert("Invalid Email or Password, please try again")
      else{
        
        this.authService.id = res.id;
        this.authService.name=res.name;
        this.authService.email=res.email;
        this.selectedUser.id=this.authService.id;
        this.selectedUser.name=this.authService.name;
        this.selectedUser.email=this.authService.email;
        console.log("---------selectedUser------",this.selectedUser);
        console.log("-------authService--------",this.authService); 
        this.router.navigate(['/dashboard'],{state:{data:this.selectedUser}})
      }
    });
  }



}
