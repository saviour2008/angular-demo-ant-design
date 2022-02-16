import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { RoleType } from './shared/constants/common.constant';
import { CommonListenerService } from './shared/service/common-listener.service';
import { StorageService } from './shared/service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private message: NzMessageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable((observer) => {
      // 如果动态想获得role是什么角色，可以用token请求API，然后破解后，返回role的值来判断是进路由还是返回
      if (this.storageService.get('role') === RoleType.Admin) {
        observer.next(true);
        observer.complete();
        return;
      }
      observer.next(false);
      observer.complete();
      this.message.create('error', '权限不足，自动跳转到welcome');
      this.router.navigate(['/welcome']);
    });
  }
}
