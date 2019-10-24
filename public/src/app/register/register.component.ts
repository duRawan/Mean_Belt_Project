import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {}
  signup: boolean;
  login: boolean;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.login = false;
    this.signup = true;
  }

  setlogin() {
    this.signup = false;
    this.login = true;
  }

  register() {
    this.authService.signIn(this.registerUserData)
      .subscribe(
        res => {
          if (typeof(res.status)=="undefined") alert("Invalid Information, please try again")
          else{
          localStorage.setItem('token', res.token)
          this.router.navigate(['/dashboard']);
        }},
        err => console.log(err)
      )
  }

}
