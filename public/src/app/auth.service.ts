import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
@Injectable()
export class AuthService {

  url: string = "http://localhost:8000";
  id: string = "";
  name: string = "";
  email: string = "";
  logged:boolean=false;
  userInfo:any;
  constructor(public http: HttpClient, public router: Router) { }

  signUp(auth) {
  console.log(auth);
  return this.http.post<any>(this.url + "/users",auth)
  }

  signIn(auth) {
    return this.http.post<any>(this.url + '/signin', auth)    
  }

  logoutUser() {//logout
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }


}
