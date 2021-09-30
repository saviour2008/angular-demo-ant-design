import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditNumber',
})
export class CreditNumberPipe implements PipeTransform {
  transform(value: string, gap: number): any {
    let numbers = [];
    for (let i = 0; i < value.length; i += gap) {
      numbers.push(value.substr(i, gap));
    }
    return numbers.join(' ');
  }
}
