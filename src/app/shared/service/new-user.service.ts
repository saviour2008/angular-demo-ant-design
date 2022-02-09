import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewUserService {
  name = 'test new data';
  constructor() {}

  getData() {
    return 'new-data';
  }
}
