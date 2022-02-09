import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewUserService } from 'src/app/shared/service/new-user.service';
import { UserServiceFactory } from 'src/app/shared/service/user-factory.service';
import { UserServiceValue } from 'src/app/shared/service/user-value.service';
import { UserService } from 'src/app/shared/service/user.service';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    SharedModule,
  ],
  // providers: [{ provide: UserService, useFactory: UserServiceFactory }],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [{ provide: UserService, useValue: UserServiceValue }],
})
export class WelcomeModule {}
