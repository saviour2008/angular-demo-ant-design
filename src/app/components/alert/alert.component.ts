import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Output() alertEmitter: EventEmitter<string> = new EventEmitter<string>();

  _type = 'success';

  @Input()
  set type(value) {
    this._type = value;
  }

  get type() {
    return this._type;
  }
  constructor() {}

  ngOnInit(): void {}

  handleOutEmitter() {
    this.alertEmitter.emit(this.type);
  }
}
