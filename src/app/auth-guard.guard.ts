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
import { RoleType } from './constants/common.constant';
import { CommonListenerService } from './service/common-listener.service';
import { StorageService } from './service/storage.service';

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
