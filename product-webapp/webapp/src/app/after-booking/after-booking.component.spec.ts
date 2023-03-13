import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterBookingComponent } from './after-booking.component';

describe('AfterBookingComponent', () => {
  let component: AfterBookingComponent;
  let fixture: ComponentFixture<AfterBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
