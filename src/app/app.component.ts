import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() state;
  @Output() msg = new EventEmitter<any>();

  clearName() {
    this.msg.emit({ action: 'clearName' });
  }
}
