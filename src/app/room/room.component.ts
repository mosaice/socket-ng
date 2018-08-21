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
  constructor(private search: SearchService, public socket: SocketService) {}
  isCollapsed = false;
  showSearch = true;
  page = 1;
  pageSize = 30;
  keyword = '';
  songCounts: number;
  list: Song[] = [];
  data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 4'
    }
  ];
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

  mute(type: 'mute' | 'muteOnce') {
    this.socket.muteAction(type);
  }

  select(song: Song) {
    // this.search.getDetail(song.id).subscribe(data => {
    //   console.log(data);
    //   const songData = { ...song, url: data };
    //   this.socket.selectSong(songData);
    // });
    const songData = {
      ...song,
      url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    };
    this.socket.selectSong(songData);
  }
}
