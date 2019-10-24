import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData :any={}
  userName:string;
  email :string;
  password :string;
  // signup: boolean;
  // login: boolean;
  selectedUser:any;


  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.selectedUser={id:"", name:"",email:"" }
    // this.login = false;
    // this.signup = true;
  }

  // setlogin() {
  //   this.signup = false;
  //   this.login = true;
  // }

  register() {
    this.registerUserData.email= this.registerUserData.email.toLowerCase(); 
    this.authService.signUp(this.registerUserData)
      .subscribe(
        res => {          
          // if (typeof(res.status)=="undefined") alert("please try again")
          //else
          if (res.status==false) alert(res.message)
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
  }

}
