import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService extends BaseService {
  constructor(message: NzMessageService) {
    super(message);
  }

  set(key, value) {
    sessionStorage.setItem(key, value);
  }

  get(key) {
    return sessionStorage.getItem(key);
  }

  remove(key) {
    sessionStorage.removeItem(key);
  }

  removeAll() {
    for (let key in sessionStorage) {
      sessionStorage.removeItem(key);
    }
  }
}
