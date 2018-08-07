import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { SocketIo } from 'ng-io';
import { AuthService } from '../services/auth.service';
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
    console.log(this.validateForm.value);
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

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
    if (this.auth.checkUser()) {
      this.router.navigate(['/']);
      return;
    }
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      avatorMode: [0, [Validators.required]]
    });
  }
}
