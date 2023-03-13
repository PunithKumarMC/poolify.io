import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapGroundOverlayComponent } from './google-map-ground-overlay.component';

describe('GoogleMapGroundOverlayComponent', () => {
  let component: GoogleMapGroundOverlayComponent;
  let fixture: ComponentFixture<GoogleMapGroundOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapGroundOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapGroundOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
