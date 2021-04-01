import { Component, AfterViewInit } from '@angular/core';
import * as L from 'Leaflet';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';   

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements  AfterViewInit {
map;
smallIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
});
  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }
createMap(){
  const tunisie = {
    lat: 33.892166,
    lng: 9.561555499999997,
  };

  const BWS = {
    lat: 36.81897,
    lng: 10.16579,
  };

  const LaMarsa = {
    lat: 36.8790882,
    lng: 10.327678,
  };

  const sfax = {
    lat: 34.7231273,
    lng: 10.3358789,
  };
  const zoomlevel = 6;
this.map = L.map('map',{
  center:[tunisie.lat, tunisie.lng],
  zoom: zoomlevel
});
const mainlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 6,
  maxZoom: 17,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

this.map.pm.addControls({
  position: 'topleft',
  drawMarker: true,
  drawCircle: false,
  drawPolygon: true,
  drawPolyline: false,
  drawCircleMarker:false,
  drawRectangle:false,
});
mainlayer.addTo(this.map);
this.addMarker(BWS);
this.addMarker(LaMarsa);
this.addMarker(sfax);


}
addMarker(coords){
  const marker =L.marker([coords.lat, coords.lng],{icon: this.smallIcon});
  marker.addTo(this.map);

}

}