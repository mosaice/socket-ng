import {
  Component,
  Injectable,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
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
  message = '';
  pageSize = 30;
  keyword = '';
  songCounts: number;
  list: Song[] = [];
  @ViewChild('chat')
  chat: ElementRef;
  ngOnInit() {
    if (!this.socket.connected) {
      this.socket.connect(this.socket.user);
    }
  }

  valueWith = data => data.name;

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
    const songData = {
      ...song,
      url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    };
    this.socket.selectSong(songData);
  }

  onKey = (event: any) => {
    if (event.key === 'Enter' && event.altKey) {
      this.socket.sendMessage(this.message);
      this.message = '';
      setTimeout(() => {
        const offset = this.chat.nativeElement.scrollHeight - 500;
        if (offset > 0) {
          this.chat.nativeElement.scrollTo(0, offset);
        }
      }, 300);
    }
  };

  onScrollUp() {
    this.socket.moreMessage();
  }
}
