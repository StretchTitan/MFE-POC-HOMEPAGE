import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LazyElementTestingDirective } from '@angular-extensions/elements/testing';
import { marbles } from 'rxjs-marbles/jest';
import { AppComponent } from './app.component';
import { PushPipe } from './push.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let httpTestingController: HttpTestingController;
  const initialState = {
    wrapper: {
      name: {
        firstName: '',
        lastName: ''
      }
    },
    toggle: {
      toggle: false
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, PushPipe, LazyElementTestingDirective],
      providers: [
        provideMockStore({ initialState }),
        PushPipe
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(fixture).toMatchSnapshot();
  });

  it(
    'ngOnChanges sets up routerState$ listener',
    marbles((m) => {
      spyOn(router, 'navigate');
      component.routerState = '/home/settings';
      component.ngOnChanges({
        routerState: new SimpleChange(null, component.routerState, true),
      });
      m.flush();
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['/home/settings']);
    })
  );

  it('ngOnDestroy emits and completes subject to destroy subs', () => {
    spyOn(component.destroySubs$, 'next');
    spyOn(component.destroySubs$, 'complete');
    component.ngOnDestroy();
    fixture.detectChanges();
    expect(component.destroySubs$.next).toHaveBeenCalledTimes(1);
    expect(component.destroySubs$.complete).toHaveBeenCalledTimes(1);
  });

  it('clearName emits msg with proper action', (done) => {
    component.msg.subscribe((value) => {
      expect(value).toEqual({ action: 'clearName' });
      done();
    });
    component.clearName();
  });

  it('getToken makes api call to get token', () => {
    component.getToken();

    const req = httpTestingController.expectOne(
      'http://local.spectrum-poc.net:4299/token'
    );

    req.flush({ token: 'testing' });
    expect(component.display).toEqual({ token: 'testing' });
  });

  it('getApi makes api call to get token', () => {
    component.getApi();

    const req = httpTestingController.expectOne(
      'http://local.spectrum-poc.net:4299/api'
    );

    req.flush({ api: 'testing' });
    expect(component.display).toEqual({ api: 'testing' });
  });

  it('clearDisplay clears display prop', () => {
    component.display = { api: 'testing' };
    component.clearResult();
    expect(component.display).toEqual('');
  });
});
