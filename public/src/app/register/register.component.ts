import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name :string;
  email :string;
  password :string;
  signup : boolean;
  login : boolean;

  constructor(public authService:AuthService, private router: Router) {  }

  ngOnInit() {
    this.login = false;
    this.signup = true;
  }

  setlogin(){
    this.signup = false;
    this.login = true;
  }

  register(){
    let auth = {
      name:this.name,
      email:this.email,
      password: this.password
    }
    this.authService.signUp(auth).subscribe((res:any)=>{
      if (typeof(res.status)=="undefined") alert(res.message)
      else{
        console.log("===================",auth)
        this.router.navigate(['/login'])
      }
    })
  }

}
