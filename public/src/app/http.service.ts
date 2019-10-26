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
  editChannel(editedChannel:any) {
    return this._http.put(this.url+'/channels/'+editedChannel._id, editedChannel);
  }
  getChannelsByUSerName(UserName){
    return this._http.get(this.url+`/channels/username/${UserName}`);
  }
  deleteChannelByID(channelID){
    return this._http.delete(this.url+`/channels/${channelID}`);
  }
  leaveChannelByID(channelID,userName){
        return this._http.get(this.url+`/leave/${channelID}/${userName}`); 
  }
  getEmail(members:string){
    console.log("..........................",members)
    return this._http.get(this.url+'/memEmail/'+members);
  }
  sendmail(email:string){
    console.log("----------EMAIL---------",email)
    return this._http.get(this.url+'/sendMail/'+email);
  }
}
