import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = "http://localhost:8000";
  constructor(private _http: HttpClient) {
    console.log("hi");
  }
  getChannelByID(id) {
    return this._http.get(this.url+'/channels/' + id);

  }
  AllgetChannel() {
    return this._http.get(this.url+'/channels');
  }
  createChannel(newChannel:any) {
    return this._http.post(this.url+'/channels', newChannel);
  }
  getChannelsByUSerName(UserName){
    return this._http.get(this.url+`/channels/username/${UserName}`);
  }
  deleteChannelByID(channelID){
    return this._http.delete(this.url+`/channels/${channelID}`);
  }
  leaveChannelByID(channelID,userName){
        return this._http.get(this.url+`/channels/${channelID}/${userName}`); 
  }
}
