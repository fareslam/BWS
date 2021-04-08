import { Component,AfterViewInit,OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import * as L from 'Leaflet';
import { Map } from 'src/app/models/map';
import { UserServiceService } from '../../services/user-service.service';

import ArrayStore from "devextreme/data/array_store";
import notify from 'devextreme/ui/notify';
import { SubUser } from 'src/app/models/sub-user';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements  AfterViewInit,OnInit {
  dataSource: Area[] = [];
  map;
  maps: Map[] = [];
  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
      iconSize:    [25, 41],
      iconAnchor:  [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      shadowSize:  [41, 41]
  });
  msg = '';
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.listAr();

  }
  ngAfterViewInit(): void {
    this.createMap();


  }
  listAr()
  {
    this.adminService.listAreas().subscribe(
      data=> {
        this.dataSource=data;
        console.log(data);
      },
      err=>{
        console.log(err);
          }
    )
  }

addArea(event){
this.adminService.addArea(event.data).subscribe(
  data=>{
    console.log(data);
    notify("Area added successfully", "success", 1500);
    this.listAr();
  },
  err=>{
    notify(err.error.message, "warning", 1500);
    this.listAr();
    console.log(err.error.message)
  }

)
}

DeleteArea(event)
{
  this.adminService.deleteArea(event.data.idArea).subscribe(
    data=>{
      console.log(data);
      notify("Area deleted successfully", "success", 1500);
      this.listAr();
    },
    err=>{
      notify(err.error.message, "warning", 1500);
      this.listAr();
      console.log(err.error.message)
    }

  )
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
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
});

this.map.pm.addControls({
  position: 'topleft',
  drawMarker: true,
  drawCircle: true,
  drawPolygon: true,
  drawPolyline: true,
  drawCircleMarker:true,
  drawRectangle:true,
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
