import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CreditCardDirective } from 'src/app/directives/creditCard.directive';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';
import { NewUserService } from 'src/app/new-user.service';
import { UserServiceFactory } from 'src/app/user-factory.service';
import { UserServiceValue } from 'src/app/user-value.service';
import { UserService } from 'src/app/user.service';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { FileSizePipe } from '../../pipes/file-size.pipe';
import { CreditNumberPipe } from '../../pipes/credit-number.pipe';

@NgModule({
  imports: [WelcomeRoutingModule, CommonModule, FormsModule],
  // providers: [{ provide: UserService, useFactory: UserServiceFactory }],
  declarations: [
    WelcomeComponent,
    CreditCardDirective,
    TooltipDirective,
    ButtonComponent,
    AlertComponent,
    FileSizePipe,
  ],
  exports: [WelcomeComponent],
  providers: [
    CreditNumberPipe,
    { provide: UserService, useValue: UserServiceValue },
  ],
})
export class WelcomeModule {}
