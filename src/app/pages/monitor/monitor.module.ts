import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MonitorComponent],
  imports: [CommonModule, MonitorRoutingModule, HttpClientModule],
})
export class MonitorModule {}
