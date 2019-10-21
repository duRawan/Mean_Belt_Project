import { Component ,OnInit} from '@angular/core';
import { HttpService } from './http.service';
import *  as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit{
  socket=io.connect();
  title = 'public';
  channel;
  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.channel =  this.getChannel()
    // console.log(this.channel);
    
  }
  getChannel() {
    let observable = this._httpService.getChannelByID();
    observable.subscribe(data => {//when the data is ready run this
      console.log("Got our channels!", data)
      this.channel = data;
      console.log( this.channel[0])
  this.socket.emit('channelID', {data:this.channel[0]})
    console.log("--------ang-----------",this.channel[0]._id);

})
  // console.log("-------------------",channel);
  // console.log(channel.messages);

  }
}
