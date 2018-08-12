import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIo } from 'ng-io';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

declare global {
  interface User {
    name: string;
    avatarText: string;
    avatarColor: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  connected = false;
  user: User;
  onlineUser: User[] = [];

  constructor(
    private socket: SocketIo,
    private router: Router,
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
      // this.getAllUsers();
    });

    this.socket.fromEvent<User[]>('getAllUsers').subscribe(users => {
      this.onlineUser = users;
    });

    this.socket.fromEvent<User[]>('userJoin').subscribe(name => {
      this.notify.info(`${name} 加入房间`, '');
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

  // getAllUsers() {
  //   this.socket.emit('getAllUsers');
  // }

  checkUser() {
    if (!!this.user) return true;

    try {
      const user = localStorage.getItem('music_user');
      if (!user) return false;
      this.user = JSON.parse(user);
      return true;
    } catch (error) {
      return false;
    }
  }

  selectSong(song: Song) {
    // TODO: 点歌
    this.socket.emit('selectSong', song);
  }
}
