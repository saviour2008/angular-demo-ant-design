import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { StorageService } from './shared/service/storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private storageService: StorageService) {}
  isCollapsed = false
  isVisible = false
  get isLogin() {
    return this.storageService.get('token')
  }
  get userName() {
    return this.storageService.get('name')
  }
  navToLogin() {
    if (this.isLogin) {
      this.showModal()
    } else {
      this.router.navigate(['login'])
    }
  }

  showModal(): void {
    this.isVisible = true
  }

  handleOk(): void {
    this.storageService.removeAll()
    this.router.navigate(['welcome'])
    this.isVisible = false
  }

  handleCancel(): void {
    this.isVisible = false
  }
}
