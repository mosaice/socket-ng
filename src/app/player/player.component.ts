import {
  Component,
  Injectable,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Input,
  OnDestroy
} from '@angular/core';
import { SocketService } from '../services/socket.service';

@Injectable()
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnDestroy {
  @Input()
  url: string;
  @Input()
  playTime: number;
  @Input()
  duration: number;
  @Input()
  mute: boolean;
  @ViewChild('audio')
  audio: ElementRef;
  percent: number = 0;
  constructor(private socket: SocketService) {}

  ngAfterViewInit() {
    this.audio.nativeElement.addEventListener('timeupdate', this.update, false);
    const time = Date.now() - this.playTime;
    this.audio.nativeElement.currentTime = time / 1000;
    this.audio.nativeElement.play();
  }

  update = (audio: HTMLAudioElement) => {
    const { currentTime, duration } = this.audio.nativeElement;
    this.percent = (currentTime / duration) * 100;
  };
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['url'].currentValue !== changes['url'].previousValue) {
  //     // this.audio.nativeElement.play();
  //   }
  // }

  ngOnDestroy() {
    this.audio.nativeElement.removeEventListener(
      'timeupdate',
      this.update,
      false
    );
  }
}
