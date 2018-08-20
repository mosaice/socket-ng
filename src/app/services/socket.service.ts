import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIo } from 'ng-io';
import {
  NzNotificationService,
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';

declare global {
  interface User {
    hash: string;
    name: string;
    avatarText: string;
    avatarColor: string;
  }

  interface ActiveSongs extends Songs {
    url: string;
    playTime: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  connected = false;
  user: User;
  onlineUser: User[] = [];
  activeSongs: ActiveSongs[] = [];
  playingSong?: SongData;
  muteOnce = false;
  mute = false;
  inited = false;
  constructor(
    private socket: SocketIo,
    private router: Router,
    private modalService: NzModalService,
    private notify: NzNotificationService,
    private message: NzMessageService
  ) {}

  init() {
    this.socket.fromEvent<User>('userConnect').subscribe(user => {
      this.connected = true;
      this.user = user;
      localStorage.setItem('music_user', JSON.stringify(user));
      if (this.router.url !== '/') {
        this.router.navigate(['/']);
      }

      this.modalService.success({
        nzTitle: `欢迎${this.router.url === '/' ? '回来' : ''} ${user.name}`,
        nzContent: '继续享受音乐吧',
        nzOnOk: () => {
          this.inited = true;
        }
      });
      // this.getAllUsers();
    });

    this.socket.fromEvent<User[]>('getAllUsers').subscribe(users => {
      this.onlineUser = users;
    });

    this.socket.fromEvent<string>('userJoin').subscribe(name => {
      if (this.connected) {
        this.notify.info(`${name} 加入房间`, '');
      }
    });

    this.socket.fromEvent<string>('userLevel').subscribe(name => {
      if (this.connected) {
        this.notify.info(`${name} 离开房间`, '');
      }
    });

    this.socket.fromEvent<SongData>('playSong').subscribe(song => {
      this.playingSong = song;
      this.muteOnce = false;
      if (song && this.connected) {
        this.notify.info(`播放歌曲 ${song.name}`, '');
      }
    });

    this.socket.fromEvent<string[]>('syncSongs').subscribe(songs => {
      this.activeSongs = songs.map(v => JSON.parse(v));
    });

    this.socket.fromEvent<string>('error').subscribe(data => {
      try {
        const error: { title: string; content: string } = JSON.parse(data);
        this.notify.error(error.title, error.content);
      } catch (error) {
        this.message.error(data);
      }
    });
  }

  connect(user: User) {
    this.socket.emit('userConnect', user);
  }

  nextSong() {
    if (this.playingSong) {
      this.socket.emit('nextSong');
    }
  }

  muteAction(type: 'mute' | 'muteOnce') {
    this[type] = !this[type];
  }

  checkUser() {
    if (!!this.user) {
      return true;
    }

    try {
      const user = localStorage.getItem('music_user');
      if (!user) {
        return false;
      }
      this.user = JSON.parse(user);
      return true;
    } catch (error) {
      return false;
    }
  }

  cleanUser() {
    this.user = null;
    this.connected = false;
    localStorage.removeItem('music_user');
    this.router.navigate(['/signin']);
  }

  selectSong(song: Song) {
    this.socket.emit('selectSong', song);
    this.message.success('点歌成功');
  }
}
