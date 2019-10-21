import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    console.log("hi");
  }
  getChannelByID(){
    return this._http.get('/channels/5dac73fa3d126bef3275b8a8');

  }

}
