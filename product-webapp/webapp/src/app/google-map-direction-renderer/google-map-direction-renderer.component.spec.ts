import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapDirectionRendererComponent } from './google-map-direction-renderer.component';

describe('GoogleMapDirectionRendererComponent', () => {
  let component: GoogleMapDirectionRendererComponent;
  let fixture: ComponentFixture<GoogleMapDirectionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapDirectionRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapDirectionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
