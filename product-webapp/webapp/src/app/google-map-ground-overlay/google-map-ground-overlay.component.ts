import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map-ground-overlay',
  templateUrl: './google-map-ground-overlay.component.html',
  styleUrls: ['./google-map-ground-overlay.component.css']
})
export class GoogleMapGroundOverlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
};
zoom = 4;
imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
imageBounds: google.maps.LatLngBoundsLiteral = {
    east: 10,
    north: 10,
    south: -10,
    west: -10,
};

}
