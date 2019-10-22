import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    console.log("hi");
  }
  getChannelByID(id) {
    return this._http.get('/channels/' + id);

  }
  AllgetChannel() {
    return this._http.get('/channels');
  }
  createChannel(newChannel) {
    return this._http.post('/channels', newChannel);
  }
}
