import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BananaComponent } from './banana.component';

describe('BananaComponent', () => {
  let component: BananaComponent;
  let fixture: ComponentFixture<BananaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BananaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BananaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
