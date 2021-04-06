import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'Leaflet';
import { Device } from 'src/app/models/device';
import { Space } from 'src/app/models/space';
import { Map } from 'src/app/models/map';
import { UserServiceService } from '../../services/user-service.service';

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
  constructor(private userService: UserServiceService) { }



  ngOnInit(): void {

    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.userService.getuserBySubUser(this.subuser.cin).subscribe(
      data => {
        this.user=data;
        this.cinu=this.user.cinu;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        console.log(this.cinu,"aaaaaaa")
      },

      err => console.log(err));
      this.listSpaces();


  }
  ngAfterViewInit(): void {
    this.createMap();

    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.userService.getuserBySubUser(this.subuser.cin).subscribe(
      data => {
        this.user=data;
        this.cinu=this.user.cinu;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        console.log(this.cinu,"aaaaaaa")
      },

      err => console.log(err));
    this.listSpaces();

  }
  listSpaces(){


      this.userService.listUserSpacesperDevice(this.subuser.cin).subscribe(
        data=> {
          this.spaces=data;
          console.log(data);
          for(let i=0;i<this.spaces.length;i++)
          {
           console.log("Longitude ==>",this.spaces[i][0])
           console.log("latitude ==>",this.spaces[i][1])


           const marker =L.marker([this.spaces[i][1], this.spaces[i][0]],{icon: this.smallIcon});
           marker.addTo(this.map);

          }
          console.log(this.maps);
        },
        err=>{
          console.log(err);
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
      for(let j=0;j<this.maps.length;j++)
      {
        const f = {
          lat: this.maps[j][0],
          lng:this.maps[j][1]
        };
        this.addMarker(f);

      }

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






    }
    addMarker(coords){
      const marker =L.marker([coords.lat, coords.lng],{icon: this.smallIcon});
      marker.addTo(this.map);

    }

    }
