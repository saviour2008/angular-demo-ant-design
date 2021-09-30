import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Output() alertEmitter = new EventEmitter();
  @Input() type = 'success';
  constructor() {}

  ngOnInit(): void {}

  handleOutEmitter() {
    this.alertEmitter.emit(this.type);
  }
}
