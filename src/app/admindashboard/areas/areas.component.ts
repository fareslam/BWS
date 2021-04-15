import { Component,AfterViewInit,OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import * as L from 'Leaflet';
import 'leaflet-draw';
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
  styleUrls: ['./areas.component.css'],

})
export class AreasComponent implements  AfterViewInit,OnInit {

  map;
  on;
spaces=[];
areas=[];
   gbeli = [
    { lat: 33.97980872872457,
    lng: 9.42626953125},
    {    lat: 33.08233672856376,
      lng: 10.415039062500002},
      {    lat: 32.75032260780972,
        lng: 10.3358789},
        {    lat:   33.52307880890422,
          lng: 8.349609375000002},

  ];

   res;
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
  options:any={};

  constructor(public adminService: AdminServiceService) { }

  ngOnInit(): void {

    this.listSpaces();
    this.listAreas();

  }
  ngAfterViewInit(): void {
    this.createMap(this.adminService);


  }





createMap(ad:AdminServiceService){

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
this.map = L.map('map', {drawControl: true}).setView([ 33.892166, 9.561555499999997], 5);
const mainlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 6,
  maxZoom: 17,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
});



const drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);
    mainlayer.addTo(this.map);





this.map.on('draw:created', function (e) {


  var type = e.layerType,
      layer = e.layer;

  drawnItems.addLayer(layer);

  var shapes = []; let tab:any;   var bb=[];

  drawnItems.eachLayer(function(layer) {
      if (layer instanceof L.Polygon) {
          shapes.push(layer.getLatLngs())
          var shape = layer.toGeoJSON()
          //
          var shape_for_db = JSON.stringify(shape);
          alert("Poly "+layer.getLatLngs());
           tab=layer.getLatLngs()[0];
          for(var i=0;i<tab.length;i++)
                {
                  console.log("LAT==>"+ tab[i]["lat"]);
                  console.log("LONG==>"+ tab[i]["lng"]);


     bb.push("["+[layer.getLatLngs()[0][i]["lat"],layer.getLatLngs()[0][i]["lng"]+"]"]);

                }

             console.log("length "+tab.length)
              var p=JSON.stringify(layer.toGeoJSON());
              ad.addArea({ "name":"","geojson":p}).subscribe(
                   data=>{
                      console.log(data);
                      notify("Area added successfully ", "success", 1500);
                      window.location.reload()

                },
                  err=>{
                      console.log(err.error.message);
                      notify(err.error.message, "warning", 1500);
                  }
                ) }

                if (layer instanceof L.Circle) {
          shapes.push([layer.getLatLng()])
        //  var shape = layer.toGeoJSON()
         // var shape_for_db = JSON.stringify(shape);
          //format json
      //  alert(shape_for_db)
          //format 3adya
          alert("cercle "+layer.getLatLng());
          console.log(layer.getLatLng()["lat"])
          console.log(layer.getLatLng()["lng"])

      }

      else if (layer instanceof L.Marker) {
          shapes.push([layer.getLatLng()]);
          //var shape = layer.toGeoJSON()
        //  var shape_for_db = JSON.stringify(shape);
          //format json
          var lat = layer.getLatLng().lat;
          var lng = layer.getLatLng().lng;
         // alert("marker "+layer.getLatLng());

          ad.addSpace(
            { "name":"",
            "longitude":lng,
            "latitude":lat
        }).subscribe(
            data=>{
               console.log(data);
               layer.bindPopup('Longitude='+lng+' | Latitude= '+lat);
               notify("Space added successfully ", "success", 1500);
               window.location.reload()
         },
           err=>{
               console.log(err.error.message);
               notify(err.error.message, "warning", 1500);
           }
         )

          console.log(layer.getLatLng())
         // alert(shape_for_db)
          //format 3adya
        //  alert(layer.getLatLng())
          //alert(shapes);
         // this.addMarker(layer.getLatLng())
      }




  // Process them any way you want and save to DB...

});

})



this.addMarker(LaMarsa);

this.addMarker(sfax);
const poly =L.polygon(this.gbeli).addTo(this.map);

}




addMarker(coords){
  const marker =L.marker([coords.lat, coords.lng],{icon: this.smallIcon});
  marker.addTo(this.map);

}

listSpaces(){


  this.adminService.listSpaces().subscribe(
    data=> {
      this.spaces=data;
      console.log(data);
     for(let i=0;i<this.spaces.length;i++)
      {
       console.log("Longitude ==>",this.spaces[i]["longitude"])
       console.log("latitude ==>",this.spaces[i]["latitude"])


       const marker =L.marker([this.spaces[i]["latitude"], this.spaces[i]["longitude"]],{icon: this.smallIcon});
       marker.addTo(this.map);

      }
    }
    ,
    err=>{
      console.log(err.error.message);
        }
  )


}



listAreas(){

  this.adminService.listAreas().subscribe(
    data=> {
      this.areas=data;
      console.log(data);
      let ch :any;

     for(let i=0;i<this.areas.length;i++)
      {
       console.log("GeoJson ==>",this.areas[i]["geojson"])

       let a = JSON.parse(this.areas[i]["geojson"]);
       console.log("aa"+a);

       ch=this.areas[i]["geojson"];
       ch = ch.substring(1,ch.length-1);
        this.res = Array.from(a);
        console.log("ch  "+ch);
        console.log("res  "+this.res);
        const geojson = new L.GeoJSON(a).addTo(this.map);

      }

    }
    ,
    err=>{
      console.log(err.error.message);
        }
  )


}



/*
addPoly(coords){
  var

}
*/
}















