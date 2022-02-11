import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { LayoutComponent } from './layout/layout.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';

import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    AlertComponent,
    ButtonComponent,
    LayoutComponent,
    PageNotFoundComponent,
    ListComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    NzResultModule,
    NzListModule,
    NzSkeletonModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSpinModule,
    NzUploadModule,
    NzIconModule,
  ],
  exports: [
    AlertComponent,
    ButtonComponent,
    LayoutComponent,
    PageNotFoundComponent,
    ListComponent,
    ItemComponent,
  ],
})
export class ComponentsModule {}
