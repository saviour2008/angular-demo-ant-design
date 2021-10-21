import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnInit {
  @Input() dynamicRef: TemplateRef<HTMLDivElement>;
  myContext = { $implicit: 'World', valueInContent: 'Hello' };
  show = true;
  constructor() {}

  ngOnInit(): void {}
}
