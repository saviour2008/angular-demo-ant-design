import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LoginRoutingModule } from './login-routing.module'
import { LoginComponent } from './login.component'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule {}
