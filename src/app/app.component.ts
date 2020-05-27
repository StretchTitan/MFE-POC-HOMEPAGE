import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, Event, RouterOutlet, ActivationStart, NavigationStart, NavigationEnd } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnChanges {
  @Input() nameState$: Observable<{}>;
  @Input() routerState: string;
  @Output() msg = new EventEmitter<any>();
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  display: any;
  count = 1;
  counter$ = interval(1000).pipe(take(6), map(() => this.count++));

  constructor(private http: HttpClient, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.routerState && changes.routerState.firstChange) {
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
