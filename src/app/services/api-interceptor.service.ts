import { Injectable, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import { filter, catchError } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(private message: NzMessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = 'http://localhost:3000';
    const successStatus = [200];

    if (req.url.includes('[noErrorCatch]')) {
      const request = req.clone({
        url: url + req.url.replace('[noErrorCatch]', '')
      });
      return next.handle(request);
    }

    const clonedRequest = req.clone({ url: url + req.url });
    return next.handle(clonedRequest).pipe(
      filter((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          if (
            !successStatus.includes(ev.status) ||
            ev.body.statusCode !== 200
          ) {
            this.message.error(`${ev.body.error}: ${ev.body.message}`);
            return false;
          }
        }
        return true;
      }),

      catchError((response: any) => {
        if (response instanceof HttpErrorResponse) {
          console.log('response in the catch: ', response);
          this.message.error(`Unexpected Error: ${response.message}`);
        }

        return Observable.throw(response);
      })
    );
  }
}
