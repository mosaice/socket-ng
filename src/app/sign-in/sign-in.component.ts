import { Component, Injectable, OnInit } from '@angular/core';
import Fingerprint2 from 'fingerprintjs2';

// import { SocketIo } from 'ng-io';
import { SocketService } from '../services/socket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  validateForm: FormGroup;
  color = '#40a9ff';
  radios = ['全称', '首字', '姓', '名'];

  submitForm(): void {
    const user = {
      name: this.validateForm.value.userName,
      avatarColor: this.color,
      avatarText: this.avatorText(),
      hash: ''
    };
    new Fingerprint2().get(result => {
      user.hash = result;
      this.socket.connect(user);
    });
  }

  constructor(private fb: FormBuilder, private socket: SocketService) {}

  avatorText() {
    const { userName, avatorMode } = this.validateForm.value;
    if (!userName) {
      return '';
    }
    const func = [
      r => r,
      r => r[0] || '',
      r => r.split(' ')[0] || '',
      r => r.split(' ')[1] || ''
    ];
    return func[avatorMode](userName);
  }

  changeColor() {
    const R = (Math.random() * 255).toFixed();
    const G = (Math.random() * 255).toFixed();
    const B = (Math.random() * 255).toFixed();
    this.color = `rgb(${R},${G},${B})`;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      avatorMode: [0, [Validators.required]]
    });
  }
}
