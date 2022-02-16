import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token = '';
  constructor(private storageService: StorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = this.storageService.get('token');
    // http://www.semlinker.com/ng-meta-service/
    const clonedRequest = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${this.token}`)
        .set('Content-type', 'application/json; charset=UTF-8'),
      // ,
    });
    console.log('new headers', clonedRequest.headers.keys());
    return next.handle(clonedRequest);
  }
}
