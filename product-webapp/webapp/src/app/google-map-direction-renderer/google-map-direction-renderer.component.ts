import { Component, OnInit } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-google-map-direction-renderer',
  templateUrl: './google-map-direction-renderer.component.html',
  styleUrls: ['./google-map-direction-renderer.component.css']
})
export class GoogleMapDirectionRendererComponent implements OnInit {



  ngOnInit(): void {
  }
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
  };
  zoom = 4;
  readonly directionsResults$: Observable < google.maps.DirectionsResult | undefined > ;
  constructor(mapDirectionsService: MapDirectionsService) {
      const request: google.maps.DirectionsRequest = {
          destination: {
              lat: 12,
              lng: 4
          },
          origin: {
              lat: 14,
              lng: 8
          },
          travelMode: google.maps.TravelMode.DRIVING
      };
      this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
  }
}
