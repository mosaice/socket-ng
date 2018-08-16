import { Component, Injectable, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { SocketService } from '../services/socket.service';
@Injectable()
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  constructor(private search: SearchService, private socket: SocketService) {}
  isCollapsed = false;
  showSearch = true;
  page = 1;
  pageSize = 30;
  keyword = '';
  songCounts: number;
  list: Song[] = [];
  ngOnInit() {
    if (!this.socket.connected) {
      this.socket.connect(this.socket.user);
    }
  }

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

  select(song: Song) {
    this.search.getDetail(song.id).subscribe(data => {
      const songData = { ...song, url: data.data[0].url };
      this.socket.selectSong(songData);
    });
  }
}
