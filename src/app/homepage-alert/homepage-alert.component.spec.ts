import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAlertComponent } from './homepage-alert.component';

describe('AlertComponent', () => {
  let component: HomepageAlertComponent;
  let fixture: ComponentFixture<HomepageAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
