import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { SocketIo } from 'ng-io';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private socket: SocketIo) {}
  title = 'app';

  ngOnInit() {
    console.log(1);
    // this.socket.connect();
    this.socket.on('connect', () => {
      console.log('Connected');
      this.socket.emit('events', { test: 'test' });
    });
    this.socket.on('events', data => {
      console.log(data);
    });
    // this.socket.emit('events', 'test');
    // this.socket.fromEvent('events').subscribe(data => console.log(data));
  }
}
