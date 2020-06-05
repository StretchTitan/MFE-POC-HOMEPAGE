import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-homepage-alert',
  templateUrl: './homepage-alert.component.html',
  styleUrls: ['./homepage-alert.component.scss']
})
export class HomepageAlertComponent {
  @Output() toggleInternalAlert: EventEmitter<any> = new EventEmitter();

  closeAlert() {
    this.toggleInternalAlert.next();
  }
}
