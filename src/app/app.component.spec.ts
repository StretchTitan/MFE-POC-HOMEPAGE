import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LazyElementTestingDirective } from '@angular-extensions/elements/testing';
import { marbles } from 'rxjs-marbles/jest';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { TokenService } from 'mfe-services-pipes';

@Pipe({name: 'push'})
class MockPipe implements PipeTransform {
    transform(value: any): any {
        return value;
    }
}

@Injectable({
  providedIn: 'root',
})
export class MockTokenService {
  getToken() {}
  getApi() {}
  clearResult() {}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let mockTokenService: MockTokenService;
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
      imports: [RouterTestingModule],
      declarations: [AppComponent, LazyElementTestingDirective, MockPipe],
      providers: [provideMockStore({ initialState }), { provide: TokenService, useClass: MockTokenService }],
    }).compileComponents();

    router = TestBed.inject(Router);
    mockTokenService = TestBed.inject(TokenService);
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

  it('getToken makes api call to TokenService', () => {
    spyOn(mockTokenService, 'getToken');
    component.getToken();
    expect(mockTokenService.getToken).toHaveBeenCalledTimes(1);
  });

  it('getApi makes api call to get token', () => {
    spyOn(mockTokenService, 'getApi');
    component.getApi();
    expect(mockTokenService.getApi).toHaveBeenCalledTimes(1);
  });

  it('clearResult clears display prop', () => {
    spyOn(mockTokenService, 'clearResult');
    component.clearResult();
    expect(mockTokenService.clearResult).toHaveBeenCalledTimes(1);
  });
});
