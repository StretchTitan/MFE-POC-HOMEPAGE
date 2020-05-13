import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  display: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.routerState && changes.routerState.currentValue.startsWith('/home')) {
      this.router.navigate([changes.routerState.currentValue]);
    }
  }

  clearName() {
    this.msg.emit({ action: 'clearName' });
  }

  getToken() {
    this.http.get('http://local.spectrum-poc.net:4299/token', { withCredentials: true })
      .subscribe(
        data => this.display = data,
        error => this.display = `${error.message}`,
      );
  }

  getApi() {
    this.http.get('http://local.spectrum-poc.net:4299/api', { withCredentials: true })
      .subscribe(
        data => this.display = data,
        error => this.display = `${error.message}`,
      );
  }

  clearResult() {
    this.display = '';
  }
}
