import { Component, OnInit, Input,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';

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
  msgFrom:boolean;
  NewUserForm:boolean;
  constructor(private _httpService: HttpService, private route: ActivatedRoute, public _auth:AuthService,    public el: ElementRef
    ) {
    this.socket = io('http://localhost:8000');
    
   }

  ngOnInit() {
    this.userName= localStorage.getItem('name'); 
    this.NewUserForm=false;
    this.msgFrom = false;
    this.route.params.subscribe(params => {
      this.ChannelID = params['ChannelID'];
      console.log("Channel ID:", this.ChannelID)

    });
    this.getChannel();
    this.scrollToBottom()



      this.socket.on('GotNewChange', (msg: any) => {
        this.getChannel() 
        
    });
  }
  getChannel() {
    let observable = this._httpService.getChannelByID(this.ChannelID);
    observable.subscribe(data => {//when the data is ready run this
      console.log("-----our channel!", data[0])
      this.ChannelInfo = data[0];
      // this.ChannelInfo.messages.shift()
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
      this.scrollToBottom();
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

  checkMsgFrom(uName){
    console.log(uName)
    if (uName == this.userName){
    console.log("false usrname")
    return false;}

    else{
      console.log("true usrname")
    return true
    }
    
  }
  checkNoMsg(){
    console.log("lennnngth",this.ChannelInfo.messages.length);
    
    if (this.ChannelInfo.messages.length > 1){
    console.log("bigger the zero");
    
    return true}

    else 
    return false
  }
  checkUser(member){
    if (this.userName == member)
    return false
    else
    return true
  }

  scrollToBottom(): void {
    let element: any = this.el.nativeElement.querySelector('.scrol');
    setTimeout(() => {
      element.scrollTop = element.scrollHeight;
    }, 100);
  }

}

