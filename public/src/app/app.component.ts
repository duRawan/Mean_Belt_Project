import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import *  as io from "socket.io-client";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  socket = io.connect();
  title = 'public';
  channel:any;
  selectedChannel;
  flag: boolean;
  newChannel;
  home: boolean;
  regst: boolean;
  login:boolean;
  dash:boolean;
  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    let observable = this._httpService.AllgetChannel();
    observable.subscribe(data => {
      console.log("Got all Channels", data);
      this.channel = data;
    });
    this.flag = false;
    this.login=false;
    this.home = true;
    this.regst = false;
    this.dash=false;
  }
  getChannel(id: String) {
    console.log(id)
    let observable = this._httpService.getChannelByID(id);
    observable.subscribe(data => {//when the data is ready run this
      console.log("Got our channels!", data)
      this.selectedChannel = data;
      console.log("--------------", this.selectedChannel)
      this.socket.emit('channelID', this.selectedChannel)
      console.log("--------ang-----------", this.selectedChannel);
    });
    // console.log("-------------------",channel);
    // console.log(channel.messages); 
  }
  setlogin(){
    this.home = false;
    this.regst = false;
    this.login=true;
  }

  setFlag() {
    this.flag = true;
  }
  setsignUp(){
    this.home = false;
    this.login=false;
    this.regst = true;
  }

  onSubmit() {
    console.log("New Channel",this.newChannel);
    let observable= this._httpService.createChannel(this.newChannel);
    observable.subscribe(data =>{
      console.log("New Channel Created! ", data);
      this.newChannel={name:"" , members:[]};
      this._httpService.AllgetChannel();
    })
    
  }
  


}