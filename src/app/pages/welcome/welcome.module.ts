import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreditCardDirective } from 'src/app/directives/creditCard.directive';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';
import { NewUserService } from 'src/app/service/new-user.service';
import { UserServiceFactory } from 'src/app/service/user-factory.service';
import { UserServiceValue } from 'src/app/service/user-value.service';
import { UserService } from 'src/app/service/user.service';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { CreditNumberPipe } from '../../pipes/credit-number.pipe';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [WelcomeRoutingModule, CommonModule, FormsModule, ComponentsModule],
  // providers: [{ provide: UserService, useFactory: UserServiceFactory }],
  declarations: [
    WelcomeComponent,
    CreditCardDirective,
    TooltipDirective,
    FileSizePipe,
  ],
  exports: [WelcomeComponent],
  providers: [
    CreditNumberPipe,
    { provide: UserService, useValue: UserServiceValue },
  ],
})
export class WelcomeModule {}
