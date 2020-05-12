import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() state;
  @Output() msg = new EventEmitter<any>();
  display: any;

  constructor( private readonly http: HttpClient ) {}

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
