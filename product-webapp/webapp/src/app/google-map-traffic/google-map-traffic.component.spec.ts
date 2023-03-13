import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapTrafficComponent } from './google-map-traffic.component';

describe('GoogleMapTrafficComponent', () => {
  let component: GoogleMapTrafficComponent;
  let fixture: ComponentFixture<GoogleMapTrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapTrafficComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
