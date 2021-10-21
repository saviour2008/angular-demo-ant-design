import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Injectable()
export class ResInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // 共同处理error的地方，如果返回的是error，那么就处理后抛出去，这样就会走errorHandler
        throw error.error;
      }),
      map((event) => {
        if (event instanceof HttpResponse) {
          console.log('response');
          if (event.body.code === 'success') {
            return event.clone({ body: event.body.data });
          }
        }
        (error: any) => {
          console.log(error);
        };
      }),
      finalize(() => {
        console.log('it is over');
      })
    );
  }
}
