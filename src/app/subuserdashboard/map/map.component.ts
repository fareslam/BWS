import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'Leaflet';
import { Device } from 'src/app/models/device';
import { Space } from 'src/app/models/space';
import { Map } from 'src/app/models/map';

import ArrayStore from "devextreme/data/array_store";
import notify from 'devextreme/ui/notify';
import { SubUser } from 'src/app/models/sub-user';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements  AfterViewInit,OnInit{
map;
i:number;
dataSource = [];
listud =[];
msg = '';
y:number;
fares:any={};
x:number;
cinu:number;
cin:number;
idSpace:Number;
user:any;
subuser:any;
ar=[];

reference:String;
form:any={};
subusers: SubUser[] = [];
spaces=[];
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
  constructor() { }



  ngOnInit(): void {

    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));






  }
  ngAfterViewInit(): void {
    this.createMap();

    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));



  }



    createMap(){
      const tunisie = {
        lat: 33.892166,
        lng: 9.561555499999997,
      };



      const zoomlevel = 6;
    this.map = L.map('map',{
      center:[tunisie.lat, tunisie.lng],
      zoom: zoomlevel
    });
    const mainlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 4,
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    });


    mainlayer.addTo(this.map);






    }
    addMarker(coords){
      const marker =L.marker([coords.lat, coords.lng],{icon: this.smallIcon});
      marker.addTo(this.map);

    }

    }
