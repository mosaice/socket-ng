import { Component, Injectable, OnInit } from '@angular/core';
// import { SocketIo } from 'ng-io';
import { SearchService, Songs, Song } from '../services/search.service';

@Injectable()
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  constructor(
    // private socket: SocketIo,
    private search: SearchService
  ) {}
  isCollapsed = false;
  // radioValue = '1';
  page = 1;
  pageSize = 30;
  keyword = '';
  songCounts: number;
  list: Song[] = [];
  ngOnInit() {}

  onSearch() {
    this.page = 1;
    this._search();
  }

  _search() {
    this.search
      .search({
        keywords: this.keyword,
        limit: this.pageSize,
        offset: this.pageSize * this.page
      })
      .subscribe(res => {
        this.list = res.songs;
        this.songCounts = res.songCount;
      });
  }

  choosePage(index: number) {
    this.page = index;
    this._search();
  }

  select(id: number) {
    this.search.getDetail(id).subscribe(data => {
      console.log(data, 111);
    });
  }
}
