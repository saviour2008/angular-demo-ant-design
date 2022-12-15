import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { ComponentsModule } from '../components/components.module'
import { CreditCardDirective } from './directives/creditCard.directive'
import { TooltipDirective } from './directives/tooltip.directive'
import { CreditNumberPipe } from './pipes/credit-number.pipe'
import { FileSizePipe } from './pipes/file-size.pipe'

/**
 * Shared module
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ComponentsModule],
  declarations: [
    CreditNumberPipe,
    FileSizePipe,
    CreditCardDirective,
    TooltipDirective
  ],
  exports: [
    CreditNumberPipe,
    FileSizePipe,
    CreditCardDirective,
    TooltipDirective,
    ComponentsModule
  ],
  providers: [FileSizePipe, CreditNumberPipe]
})
export class SharedModule {}
