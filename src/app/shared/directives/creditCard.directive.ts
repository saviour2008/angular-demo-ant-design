import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input
} from '@angular/core'

@Directive({
  selector: '[creditCard]'
})
export class CreditCardDirective {
  @Input() appHighlight = ''
  @Input() defaultColor = ''
  constructor(private element: ElementRef) {}
  @HostBinding('style.border') border: string
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.defaultColor)
  }

  @HostListener('input', ['$event']) onKeyDown(event: KeyboardEvent) {
    // 只有传入了['$event']，必须是$event，在onKeyDown里面才能获取到正确获取事件对象
    // 在onKeyDown里面获取的参数就是[]里面传入的参数
    console.log(event)
    const input = event.target as HTMLInputElement
    let trimmed = input.value.replace(/\s+/g, '')
    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16)
    }

    let numbers = []
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4))
    }

    input.value = numbers.join(' ')

    this.border = ''
    // 如果填入的不是数字，边框为红色
    if (/[^\d]+/.test(trimmed)) {
      this.border = '3px solid red'
    }
  }
  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color
  }
}
