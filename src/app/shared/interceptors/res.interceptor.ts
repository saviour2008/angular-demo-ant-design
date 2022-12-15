import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http'

import { EMPTY, Observable, of, throwError } from 'rxjs'
import { catchError, finalize, map, tap, timeout } from 'rxjs/operators'
const DEFAULT_TIMEOUT = 30000
const ignoreErrorUrls = ['/log/error']
@Injectable()
export class ResInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      timeout(DEFAULT_TIMEOUT),
      catchError((error: HttpErrorResponse) => {
        if (this.shouldIgnoreError(req.url)) {
          return EMPTY
        }
        // 如果返回的是error(指的不是服务器内部处理后的error)，
        // 如果发送API的地方用了catchError，这样会进入到baseService的handleCommonError
        // 如果发送API的地方没有错误处理，那么就会直接进入到web-error的handleError
        // 因为后端加了HttpExceptionFilter
        return throwError(error.error)
      }),
      map((event) => {
        // 返回状态码是200的情况
        if (event instanceof HttpResponse) {
          if (event.body.status === 'success') {
            return event.clone({ body: event.body.data })
          } else if (this.shouldIgnoreError(event.url)) {
            return new HttpResponse()
          } else {
            // 服务器内部处理后的error code（比如500等，需要前后台约定好）,先获取全部error信息，再抛给baseService的handleCommonError
            const httpErrorInfo = this.convertToErrorResponse(event)
            throw httpErrorInfo.error
          }
        }
      }),
      finalize(() => {
        console.log('it is over')
      })
    )
  }

  private shouldIgnoreError(requestUrl: string): boolean {
    if (!requestUrl) {
      return false
    }
    for (const url of ignoreErrorUrls) {
      if (requestUrl.indexOf(url) !== -1) {
        return true
      }
    }
    return false
  }

  // private createError(error: HttpErrorResponse): ApplicationError {
  //   switch (error.error.status) {
  //     case ResponseStatus.VALIDATION_FAILURE:
  //       return new BusinessError(error);
  //     case ResponseStatus.SYSTEM_ERROR:
  //       return new ApiSystemError(error);
  //     case ResponseStatus.APP_VERSION_ERROR:
  //       return new ApplicationVersionError(error);
  //     case ResponseStatus.MAINTENANCE:
  //       return new MaintenanceError(error);
  //     default:
  //       return new NetworkError(error);
  //   }
  // }

  private convertToErrorResponse(
    response: HttpResponse<any>
  ): HttpErrorResponse {
    return new HttpErrorResponse({
      error: { ...response.body, url: response.url },
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
      url: response.url
    })
  }
}
