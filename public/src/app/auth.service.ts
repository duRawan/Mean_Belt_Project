import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AuthService {

  url: string = "http://localhost:8000";
  id: string = "";
  name: string = "";
  constructor(public http: HttpClient) { }

  signUp(auth) {
  console.log(auth);

    return this.http.post(this.url + "/users",auth)
    
  }


  signIn(auth) {
    return this.http.post(this.url + '/signin', auth)
    
  }


}
