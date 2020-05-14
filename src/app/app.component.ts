import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { interval, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnChanges, OnDestroy {
  @Input() nameState$: Observable<{}>;
  @Input() routerState$: Observable<string>;
  @Output() msg = new EventEmitter<any>();
  destroySubs$ = new Subject();
  display: any;
  count = 1;
  counter$ = interval(1000).pipe(take(6), map(() => this.count++));

  constructor(private http: HttpClient, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.routerState$ && changes.routerState$.firstChange) {
      this.routerState$.pipe(
        takeUntil(this.destroySubs$),
        filter((route: string) => route.startsWith('/home'))
      ).subscribe(route => this.router.navigate([route]));
    }
  }

  ngOnDestroy(): void {
    this.destroySubs$.next();
    this.destroySubs$.complete();
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
