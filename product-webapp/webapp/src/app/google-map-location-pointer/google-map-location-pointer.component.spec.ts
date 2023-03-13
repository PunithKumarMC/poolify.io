import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapLocationPointerComponent } from './google-map-location-pointer.component';

describe('GoogleMapLocationPointerComponent', () => {
  let component: GoogleMapLocationPointerComponent;
  let fixture: ComponentFixture<GoogleMapLocationPointerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapLocationPointerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapLocationPointerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
