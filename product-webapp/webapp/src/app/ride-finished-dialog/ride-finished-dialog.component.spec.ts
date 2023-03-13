import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideFinishedDialogComponent } from './ride-finished-dialog.component';

describe('RideFinishedDialogComponent', () => {
  let component: RideFinishedDialogComponent;
  let fixture: ComponentFixture<RideFinishedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideFinishedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideFinishedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
