import { Injectable, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY, Observable } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private injector: Injector, private message: NzMessageService) {}

  handleCommonError(): (error: any) => Observable<any> {
    // 这里是共同处理请求error的地方（从res.interceptor进来的）

    return (error) => {
      console.log('handle base service common error');
      // 向后台发送错误log，如果API报错，不需要catchError，API直接会在shouldIgnoreError掉
      // this.injector
      //   .get(ErrorService)
      //   .postError(error)
      //   .subscribe((res) => {
      //     if (res) {
      //       console.log('Error has been submitted');
      //     }
      //   });
      // this.message.create('error', error.message);
      // 统一根据error status来分情况，||可以再多加一些情况
      if (error.status === 404 || error.status === 500) {
        this.message.create('error', error.message);
        return EMPTY;
      } else if (error.status === 401) {
        this.message.create('error', error.message || '当前用户无权限');
        return EMPTY;
      }
      // 传递给各个页面自己处理，走各个页面的handleBusinessError,
      // 如果各个页面没有写自己的handleBusinessError，那么这个错就会抛到web-error上
      throw error;
    };
  }
}
