import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map-traffic',
  templateUrl: './google-map-traffic.component.html',
  styleUrls: ['./google-map-traffic.component.css']
})
export class GoogleMapTrafficComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
};
zoom = 4;

}
