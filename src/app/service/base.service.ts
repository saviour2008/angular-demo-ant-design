import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private message: NzMessageService) {}

  handleError(): (error: any) => Observable<any> {
    // 这里是共同处理请求error的地方，可以根据返回的error code来统一改变
    return (error) => {
      console.log('application error handle');

      this.message.create('error', error.error.message);
      if (error.code === 404 || error.code === 500) {
        return EMPTY;
      }
      throw error;
    };
  }
}
