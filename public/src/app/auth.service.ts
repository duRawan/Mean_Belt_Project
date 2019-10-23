import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AuthService {

  url: string = "http://localhost:8000";
  id: string = "";
  name: string = "";
  email: string = "";
  logged:boolean=false;
  userInfo:any;
  constructor(public http: HttpClient) { }

  signUp(auth) {
  console.log(auth);
  this.userInfo=this.http.post(this.url + "/users",auth)
  return this.userInfo;
  }


  signIn(auth) {
    this.userInfo=this.http.post(this.url + '/signin', auth)   
    return this.userInfo;
  }


}
