import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from '../service/error.service';
@Injectable()
export class WebErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService) {}
  // 共同处理error的地方，API请求的一旦出现error都会走这里，自动会走这里，然后往服务端发送errorlog
  handleError(error) {
    console.log(error);
    if (error.status >= 400)
      this.errorService.postError(error).subscribe((res) => {
        if (res) {
          console.log('Error has been submited');
        }
      });
  }
}
