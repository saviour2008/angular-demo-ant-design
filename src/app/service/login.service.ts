import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(private httpClient: HttpClient, message: NzMessageService) {
    super(message);
  }

  // 服务端不保存 sessionId，用户登录系统后，服务器给他下发一个令牌(token)，下一次用户再次通过 Http 请求访问服务器的时候，
  // 把这个 token 通过 Http header 或者 url 带过来进行校验。为了防止别人伪造，我们可以把数据加上一个只有自己才知道的密钥，
  // 做一个签名，把数据和这个签名一起作为 token 发送到服务器。这样我们就不用保存 token 了，因为发送给用户的token里，已经包含了用户信息。
  // 当用户再次请求过来的时候我用同样的算法和密钥对这个 token 中的数据进行加密，如果加密后的结果和 token 中的签名一致，
  // 那我们就可以进行鉴权，并且也能从中取得用户信息。
  // https://juejin.cn/post/6890377073366597645#heading-15
  postData(form) {
    return this.httpClient.post('apidata/login', form);
  }
}
