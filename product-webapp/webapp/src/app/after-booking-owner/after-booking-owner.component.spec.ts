import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterBookingOwnerComponent } from './after-booking-owner.component';

describe('AfterBookingOwnerComponent', () => {
  let component: AfterBookingOwnerComponent;
  let fixture: ComponentFixture<AfterBookingOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterBookingOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterBookingOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
