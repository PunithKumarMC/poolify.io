import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMediumComponent } from './payment-medium.component';

describe('PaymentMediumComponent', () => {
  let component: PaymentMediumComponent;
  let fixture: ComponentFixture<PaymentMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMediumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
