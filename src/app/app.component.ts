import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { interval, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { selectToggle } from './store/selectors/toggle/toggle.selectors';
import { toggle } from './store/actions/toggle/toggle.actions';
import { hydrateWrapper } from './store/actions/wrapper/wrapper.actions';
import { selectWrapperNameState } from './store/selectors/wrapper/wrapper.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnChanges, OnDestroy {
  @Input() nameState$: Observable<{ firstName: string, lastName: string }>;
  @Input() routerState: string;
  @Output() msg = new EventEmitter<any>();
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  toggleState$: Observable<boolean>;
  destroySubs$ = new Subject();
  storeNameState$: Observable<{ firstName: string, lastName: string }>;
  display: any;
  count = 1;
  counter$ = interval(1000).pipe(take(6), map(() => this.count++));

  constructor(private http: HttpClient, private router: Router, private store: Store) {
    this.toggleState$ = store.select(selectToggle);
    this.storeNameState$ = store.select(selectWrapperNameState);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.routerState && changes.routerState.firstChange) {
      this.router.navigate([changes.routerState.currentValue]);
    }

    if (changes.nameState$ && changes.nameState$.firstChange) {
      this.nameState$.pipe(
        takeUntil(this.destroySubs$)
      ).subscribe(name => this.store.dispatch(hydrateWrapper(name)));
    }
  }

  ngOnDestroy(): void {
    this.destroySubs$.next();
    this.destroySubs$.complete();
  }

  clearName() {
    this.msg.emit({ action: 'clearName' });
  }

  flipToggle() {
    this.store.dispatch(toggle());
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
