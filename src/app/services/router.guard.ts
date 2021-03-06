import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { SocketService } from './socket.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private socket: SocketService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.socket.checkUser()) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }
}

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private socket: SocketService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.socket.checkUser()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
