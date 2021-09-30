import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { zip, of, forkJoin } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  name = 'test new data';

  constructor(private httpClient: HttpClient) {}

  getData() {
    const params = new HttpParams({ fromObject: { _page: '1', _limit: '10' } });
    const responseType = 'text'; //除了支持 json 和 text 类型外，还支持 arraybuffer 和 blob 类型
    const headers = new HttpHeaders()
      .set('token', 'iloveangular')
      .set('Content-type', 'application/json; charset=UTF-8'); // 设置请求头
    return this.httpClient.get('apidata/list', {
      params,
      headers,
      observe: 'response', // 此时可以获取完整的响应对象
      responseType: responseType,
    });
  }

  postData() {
    const params = new HttpParams({ fromObject: { _page: '1', _limit: '10' } });
    const responseType = 'json'; //除了支持 json 和 text 类型外，还支持 arraybuffer 和 blob 类型
    const headers = new HttpHeaders()
      .set('token', 'iloveangular')
      .set('Content-type', 'application/json; charset=UTF-8'); // 设置请求头
    return this.httpClient.post(
      'apidata/new',
      { name: '111' },
      {
        params,
        headers,
        observe: 'response', // 此时可以获取完整的响应对象
        responseType: responseType,
      }
    );
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
