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
  formFlag:boolean;
  buttonFlag:boolean;
  newChannelName:string;
  Nmember:string;
  newChannelMembers:string[]=[];
  constructor(private _httpService: HttpService , public _auth:AuthService) { }
  currentUser:any=history.state.data;
  ngOnInit() {
    console.log("------------Start Dashboard-------------");
    console.log("---",this.currentUser);
    console.log("Dashboard >> userName: ", this.currentUser['name']);
    console.log("Dashboard >> email: ", this.currentUser['email']);
    this.getUserChannels();
    this.formFlag=false;
    this.buttonFlag=true;
  }
  NewMemeber(m:string){
    console.log(m);
    this.newChannelMembers.push(m)
  }
  DeleteMember(m){
    this.newChannelMembers.splice(this.newChannelMembers.indexOf(m),1 )
  }////by name
  newChannel(){
let channel={
  name:this.newChannelName,
  members:this.newChannelMembers,
  owner:this.currentUser['name']//<<from session>>
}
let observable = this._httpService.createChannel(channel);
observable.subscribe(data => {//when the data is ready run this
  console.log("Create Channel --------:",data)
  this.getUserChannels()
  this.formFlag=false;
 this.buttonFlag=true;
})

  }
  ShowAddForm(){
    this.buttonFlag=false;
    this.formFlag=true;
  }
  deleteChannel(id){
    var r = confirm("Are you sure to delete this channel!");
    if (r == true) {
      let observable = this._httpService.deleteChannelByID(id);
      observable.subscribe(data => {//when the data is ready run this
        console.log("Delete Channel:", data)
        this.getUserChannels();
      })
    } 
  }
  leaveChannel(ChannelID){
    var r = confirm("Are you sure to leave this channel!");
    if (r == true) {
    let observable = this._httpService.leaveChannelByID(ChannelID,this.currentUser.name);
    observable.subscribe(data => {//when the data is ready run this
      console.log("Leave Channel:", data)
      this.getUserChannels();
    })
  }
  }
  getUserChannels() {
    let observable = this._httpService.getChannelsByUSerName(this.currentUser.name);
    observable.subscribe(data => {//when the data is ready run this
      console.log("Dashboard >> User Channels:", data)
      this.UserChannels = data;
      console.log("--------------End Dashboard--------------");
    })
  }


}