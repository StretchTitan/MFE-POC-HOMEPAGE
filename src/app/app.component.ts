import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  @Input() nameState;
  @Input() routerState;
  @Output() msg = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.routerState && changes.routerState.currentValue.startsWith('/home')) {
      this.router.navigate([changes.routerState.currentValue]);
    }
  }

  clearName() {
    this.msg.emit({ action: 'clearName' });
  }
}
