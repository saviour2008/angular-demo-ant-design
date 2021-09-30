import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getData() {
    return 'Directive and Service test, please mouseover "?" ----------  ';
  }
}
