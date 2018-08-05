import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { SocketIo } from 'ng-io';
import { SearchService, Songs, Song } from './services/search.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private socket: SocketIo, private search: SearchService) {}
  isCollapsed = false;
  // radioValue = '1';
  page = 1;
  pageSize = 30;
  keyword = '';
  songCounts: number;
  list: Song[] = [];

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
}
