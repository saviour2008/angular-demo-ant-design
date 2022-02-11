import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { zip, of, forkJoin } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends BaseService {
  name = 'test new data';

  constructor(
    injector: Injector,
    message: NzMessageService,
    private httpClient: HttpClient
  ) {
    super(injector, message);
  }

  // getData(item) {
  //   const responseType = 'json'; //除了支持 json 和 text 类型外，还支持 arraybuffer 和 blob 类型
  //   const headers = new HttpHeaders().set(
  //     'Content-type',
  //     'application/json; charset=UTF-8'
  //   ); // 设置请求头
  //   if (typeof item === 'object') {
  //     //说明请求的是list
  //     const params = new HttpParams({ fromObject: item });
  //     return this.httpClient
  //       .get('apidata/list', {
  //         params,
  //         headers,
  //         // observe: 'response', // 此时可以获取完整的响应对象
  //         responseType: responseType,
  //       })
  //       .pipe(catchError(this.handleError()));
  //   } else {
  //     //说明请求的是item
  //     return this.httpClient
  //       .get('apidata/list/' + item, {
  //         headers,
  //         // observe: 'response', // 此时可以获取完整的响应对象
  //         responseType: responseType,
  //       })
  //       .pipe(catchError(this.handleError()));
  //   }
  // }

  getData(item) {
    const responseType = 'json'; //除了支持 json 和 text 类型外，还支持 arraybuffer 和 blob 类型
    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8'
    ); // 设置请求头
    const params = new HttpParams({ fromObject: item });
    return this.httpClient
      .get('apidata/articles', {
        headers,
        params,
        // observe: 'response', // 此时可以获取完整的响应对象
        responseType: responseType,
      })
      .pipe(catchError(this.handleCommonError()));
  }

  create(data) {
    const responseType = 'json'; //除了支持 json 和 text 类型外，还支持 arraybuffer 和 blob 类型
    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8'
    ); // 设置请求头
    return this.httpClient
      .post('apidata/articles', data, {
        headers,
        observe: 'response', // 此时可以获取完整的响应对象
        responseType: responseType,
      })
      .pipe(catchError(this.handleCommonError()));
  }

  update(data) {
    const responseType = 'json'; //除了支持 json 和 text 类型外，还支持 arraybuffer 和 blob 类型
    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8'
    ); // 设置请求头
    return this.httpClient
      .put('apidata/articles/update', data, {
        headers,
        observe: 'response', // 此时可以获取完整的响应对象
        responseType: responseType,
      })
      .pipe(catchError(this.handleCommonError()));
  }

  getArticle(item) {
    const responseType = 'json'; //除了支持 json 和 text 类型外，还支持 arraybuffer 和 blob 类型
    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8'
    ); // 设置请求头
    return this.httpClient
      .get(`apidata/articles/${item}`, {
        headers,
        // observe: 'response', // 此时可以获取完整的响应对象
        responseType: responseType,
      })
      .pipe(catchError(this.handleCommonError()));
  }

  deleteArticle(id) {
    return this.httpClient
      .delete(`apidata/articles/${id}`)
      .pipe(catchError(this.handleCommonError()));
  }

  sendAsyncApiRequest() {
    // 并行发送多个 Http 请求
    const parallel$ = forkJoin([
      this.httpClient.get('apidata/list'),
      this.httpClient.get('apidata/user'),
    ]);

    return parallel$;
  }

  sendSyncApiRequest() {
    // 同步顺序发送请求
    const ob = this.httpClient.get('apidata/list').pipe(
      catchError((error) => {
        console.error('Error catched', error);
        return of({ description: 'Error Value Emitted' });
      }),
      switchMap((data: any) => {
        const postaData = data.data[0];
        return this.httpClient.put('apidata/update/1', postaData);
      })
    );
    return ob;
  }
}
