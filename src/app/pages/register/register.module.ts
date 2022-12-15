import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './register.component'
import { RegisterRoutingModule } from './register-routing.module'
import { NzSelectModule } from 'ng-zorro-antd/select'

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    NzFormModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzSelectModule
  ]
})
export class RegisterModule {}
