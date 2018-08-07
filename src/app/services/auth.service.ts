import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// interface SearchParm {
//   keywords: string;
//   limit?: number;
//   offset?: number;
//   type?: number;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  user = false;
  checkUser() {
    return this.user;
  }
}
