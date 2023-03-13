import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatemeComponent } from './rateme.component';

describe('RatemeComponent', () => {
  let component: RatemeComponent;
  let fixture: ComponentFixture<RatemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
