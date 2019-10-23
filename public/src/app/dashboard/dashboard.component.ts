import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';

import { Router, NavigationExtras }  from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  UserChannels: any;
  constructor(private _httpService: HttpService , public _auth:AuthService) { }
  currentUser:any=history.state.data;
  ngOnInit() {
    console.log("------------Start Dashboard-------------");
    console.log("---",this.currentUser);
    console.log("Dashboard >> userName: ", this.currentUser['name']);
    console.log("Dashboard >> email: ", this.currentUser['email']);
    this.getUserChannels();
  }
  deleteChannel(id){
    let observable = this._httpService.deleteChannelByID(id);
    observable.subscribe(data => {//when the data is ready run this
      console.log("Delete Channel:", data)
      this.getUserChannels();
    })
  }
  leaveChannel(ChannelID){
    let observable = this._httpService.leaveChannelByID(ChannelID,this.currentUser.name);
    observable.subscribe(data => {//when the data is ready run this
      console.log("Leave Channel:", data)
      this.getUserChannels();
    })

  }
  getUserChannels() {
    let observable = this._httpService.getChannelsByUSerName(this.currentUser.name);
    observable.subscribe(data => {//when the data is ready run this
      console.log("Dashboard >> User Channels:", data)
      this.UserChannels = data;
      for (var c in this.UserChannels) {
        console.log(this.UserChannels[c]);
        if (c['owner'] == this.currentUser.name)
          console.log("Delete Channel");
        else {
          console.log("Leave Channel");
        }
        console.log("-----------------------------------");
      }
      console.log("--------------End Dashboard--------------");
    })
  }


}
