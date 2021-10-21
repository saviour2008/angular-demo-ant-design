import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxjsRoutingModule } from './rxjs-routing.module';
import { RxjsComponent } from './rxjs.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [RxjsComponent],
  imports: [CommonModule, RxjsRoutingModule, ComponentsModule],
})
export class RxjsModule {}
