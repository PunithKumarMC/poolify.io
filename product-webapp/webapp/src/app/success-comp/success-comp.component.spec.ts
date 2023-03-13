import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCompComponent } from './success-comp.component';

describe('SuccessCompComponent', () => {
  let component: SuccessCompComponent;
  let fixture: ComponentFixture<SuccessCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
