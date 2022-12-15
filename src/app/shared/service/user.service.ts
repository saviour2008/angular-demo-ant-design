import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { catchError } from 'rxjs/operators'
import { NzMessageService } from 'ng-zorro-antd/message'
import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    message: NzMessageService,
    injector: Injector
  ) {
    super(injector, message)
  }

  getData() {
    return 'Directive and Service test, please mouseover "?" ----------  '
  }

  getUsers() {
    const responseType = 'json' // 除了支持 json 和 text 类型外，还支持 arraybuffer 和 blob 类型
    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8'
    ) // 设置请求头

    return this.httpClient
      .get('apidata/users/', {
        headers,
        // observe: 'response', // 此时可以获取完整的响应对象
        responseType: responseType
      })
      .pipe(catchError(this.handleCommonError()))
  }
}
