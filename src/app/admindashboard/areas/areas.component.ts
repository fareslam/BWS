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

  var bb=[]; var shapes = [];

  drawnItems.eachLayer(function(layer) {
      if (layer instanceof L.Polygon) {
          shapes.push(layer.getLatLngs())
          var shape = layer.toGeoJSON()
          //
          var shape_for_db = JSON.stringify(shape);
          alert("Poly "+layer.getLatLngs());
          for(var i=0;i<layer.getLatLngs()[0].length;i++)
                {
                  console.log("LAT==>"+ layer.getLatLngs()[0][i]["lat"]);
                  console.log("LONG==>"+ layer.getLatLngs()[0][i]["lng"]);

                  bb.push("["+[layer.getLatLngs()[0][i]["lat"],layer.getLatLngs()[0][i]["lng"]+"]"]);


                }
             console.log("bb "+bb)

              var form:any={
                  "idArea":85,
                "name":"",
                "geojson":bb
                           };

              var s=JSON.stringify(bb);
              var p=JSON.stringify(layer.toGeoJSON().geometry.coordinates);
             console.log("form "+form)


              ad.addArea({ "name":"","geojson":p}).subscribe(
                   data=>{
                      console.log(data);
                      notify("Area added successfully ", "success", 1500);
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
          alert("marker "+layer.getLatLng());
          layer.bindPopup('Longitude='+lng+' | Latitude= '+lat);
          ad.addSpace(
            { "name":"",
            "longitude":lng,
            "latitude":lat
        }).subscribe(
            data=>{
               console.log(data);
               notify("Space added successfully ", "success", 1500);
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
/*
addPoly(coords){
  var poly = L.polygon().addTo(this.map);

}
*/
}















