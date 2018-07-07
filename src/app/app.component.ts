import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { SocketIo } from 'ng-io';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private socket: SocketIo) {}
  isCollapsed = false;
  radioValue = '1';
  list = [
    {
      name: '海阔天空',
      id: 400162138,
      artists: 'Beyond',
      artistsUrl:
        'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
      album: '华纳23周年纪念精选系列',
      albumUrl:
        'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
      duration: 323693
    },
    {
      name: '海阔天空',
      id: 347230,
      artists: 'Beyond',
      artistsUrl:
        'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
      album: '海阔天空',
      albumUrl:
        'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
      duration: 326348
    }
  ];
}
