import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageWidgetComponent } from './homepage-widget.component';

describe('HomepageWidgetComponent', () => {
  let component: HomepageWidgetComponent;
  let fixture: ComponentFixture<HomepageWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
