import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // http://www.semlinker.com/ng-meta-service/
    const clonedRequest = req.clone({
      headers: req.headers.set('X-CustomAuthHeader', 'iloveangular'),
    });
    console.log('new headers', clonedRequest.headers.keys());
    return next.handle(clonedRequest);
  }
}
