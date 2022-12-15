import { Directive, ElementRef, Input, OnInit } from '@angular/core'

@Directive({
  selector: '[tooltip]',
  exportAs: 'tooltipDom'
})
export class TooltipDirective implements OnInit {
  tooltipElement = document.createElement('div')
  @Input() set tooltip(value) {
    this.tooltipElement.textContent = value
  }

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.tooltipElement.className = 'tooltip'
    this.tooltipElement.style.display = 'inline-block'
    this.element.nativeElement.classList.add('tooltip-container')
  }
  show() {
    this.element.nativeElement.appendChild(this.tooltipElement)
    this.tooltipElement.style.color = 'red'
  }
  hide() {
    this.element.nativeElement.removeChild(this.tooltipElement)
    this.tooltipElement.style.color = '#000'
  }
}
