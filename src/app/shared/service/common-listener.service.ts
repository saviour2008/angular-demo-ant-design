import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
// interface listenerMap {
//   editStatus: boolean;
// }
@Injectable({
  providedIn: 'root'
})
export class CommonListenerService {
  public editStatus$: Subject<boolean> = new Subject<boolean>()
  authRoles = {
    admin: false
  }
  constructor() {}
  hasRole(key) {
    return this.authRoles[key]
  }
}
