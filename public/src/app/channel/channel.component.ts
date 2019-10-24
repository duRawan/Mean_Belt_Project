import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs/Observable';
import *  as io from "socket.io-client";
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {
  // @Input() ChannelToShow: any;
  private socket: SocketIOClient.Socket;
  ChannelID: any;
  ChannelInfo: any;
  message: string;
  userName: string;
  time: string;
  owner:boolean;
  NewUserForm:boolean;
  constructor(private _httpService: HttpService, private route: ActivatedRoute) {
    this.socket = io('http://localhost:8000');
   }

  ngOnInit() {
    this.userName= "Rawan"; //<<from sesstion
    this.NewUserForm=false;
    this.route.params.subscribe(params => {
      this.ChannelID = params['ChannelID'];
      console.log("Channel ID:", this.ChannelID)
    });
    this.getChannel();



      this.socket.on('GotNewChange', (msg: any) => {
        this.getChannel() 
    });
  }
  getChannel() {
    let observable = this._httpService.getChannelByID(this.ChannelID);
    observable.subscribe(data => {//when the data is ready run this
      console.log("-----our channel!", data[0])
      this.ChannelInfo = data[0];
      //Need to check after sesstion>>if username not in members array for this.ChannelInfo redirct to dashboard   << important
      if (this.userName==this.ChannelInfo.owner){
        this.owner=true;      
      }
    });
    //add messages to socket <<here>>
  }

  SendMessage() {
    var d = new Date();
    this.time = d.getHours() + ":" + d.getMinutes();
    let m = {
      userName: this.userName,
      message: this.message,
      time: this.time
    }
    this.message="";
    //add new message to channel
    this.ChannelInfo.messages.push(m);
    //edit channel     
    let observable = this._httpService.editChannel(this.ChannelInfo);
    observable.subscribe(data => {//when the data is ready run this
      console.log("updated Channel:", data)
      //socket bodcast to everyone
      // this.getChannel();
      this.socket.emit('ChannelUpdated', {channel:this.ChannelInfo})
    })
  }
  NewUserButton(){
    this.NewUserForm=true;
    this.owner=false;
  }
  NewMember(Nmember){
    this.ChannelInfo.members.push(Nmember);
    let observable = this._httpService.editChannel(this.ChannelInfo);
    observable.subscribe(data => {//when the data is ready run this
      console.log("updated Channel:", data)
      //socket bodcast to everyone
      // this.getChannel();
      this.socket.emit('ChannelUpdated', {channel:this.ChannelInfo})
      this.NewUserForm=false;
      this.owner=true;
    })


  }

}
