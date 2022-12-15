import { ErrorHandler, Injectable } from '@angular/core'
import { ErrorService } from '../service/error.service'
@Injectable()
export class WebErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService) {}
  // 这里指的是应用发生错误自动触发的钩子回调，不管是前后端的错，只要没有主动捕捉到的，都会自动调用这个钩子
  // 如果发送API报错，那么会在res.interceptor里catchError中拦截，如果那里拦截，这里就不会再次触发
  // 也就是说前端如果报错这里都可以console出来，如果前端没有拦截后端的错误，这里也会触发。
  handleError(error) {
    console.log('handle root error' + error)
    if (error.status >= 400)
      this.errorService.postError(error).subscribe((res) => {
        if (res) {
          console.log('Error has been submitted')
        }
      })
  }
}
