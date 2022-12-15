import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/shared/service/login.service'
import { StorageService } from 'src/app/shared/service/storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty()
        this.validateForm.controls[i].updateValueAndValidity()
      }
    }
    this.loginService.login(this.validateForm.value).subscribe((data: any) => {
      this.router.navigate(['welcome'])
      this.storageService.set('token', data.token)
      this.storageService.set('role', data.role)
      this.storageService.set('name', this.validateForm.value.userName)
    })
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    console.log('test')
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
    this.readFileData().then((data) => {
      console.log(data)
    })
  }
  // async函数返回得是promise，如果方法里面用了await，外面必须用async
  // await 返回得是正常值
  async readFileData() {
    const data = await Promise.resolve(2)
    console.log(data)
    return 1
  }

  navToRegister() {
    this.router.navigate(['register'])
  }
}
