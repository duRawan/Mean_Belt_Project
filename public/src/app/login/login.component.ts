import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router, NavigationExtras }  from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUserData :any= {}
  email :string;
  password :string;
  selectedUser:any;

  constructor(public authService:AuthService, private router: Router) { 

  }

  ngOnInit() {
    this.selectedUser={id:"", name:"",email:"" }
  }

  login(){
    this.loginUserData.email= this.loginUserData.email.toLowerCase(); 

    this.authService.signIn(this.loginUserData)
    .subscribe(
      res => {
      if (typeof(res.status)=="undefined") alert("Invalid Email or Password, please try again")
      else{
        localStorage.setItem('token', res.token)
        localStorage.setItem('name', res.name)
        localStorage.setItem('id', res.id)
        
        this.selectedUser.name=localStorage.getItem('name');
        this.selectedUser.id=localStorage.getItem('id');
        this.router.navigate(['/dashboard']); 
      }},
      err => console.log(err)
    ) 
        console.log("---------selectedUser------",this.selectedUser);
  }



}
