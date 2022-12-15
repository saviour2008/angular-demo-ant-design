import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { mapTo } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private http: HttpClient) {}
  postError(error) {
    // const headers = new HttpHeaders().set(
    //   'Content-type',
    //   'application/json; charset=UTF-8'
    // ); // 设置请求头
    return this.http.post('apidata/log/error', error)
    // .pipe(mapTo(true))
  }
}
