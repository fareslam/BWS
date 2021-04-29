import { Component, OnInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";
import { StockChart } from 'angular-highcharts';
import { WebSocketAPI } from 'src/app/WebSocketAPI';

import { AdminServiceService } from '../../services/admin-service.service';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {

  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  x:any;
  cin_admin:number;
  admin:any;
  L:number;
  subuser:any;
  stock: StockChart;
v:any;
listValues:any=[];


Highcharts: typeof Highcharts = Highcharts;


  constructor(private adminService: AdminServiceService) { }
  ngOnInit() {
    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.adminService.getAdmin(this.subuser.cin).subscribe(
      data => {
        this.admin=data;
        this.cin_admin=this.admin.cin_admin;
        console.log("cinADMIN"+this.cin_admin)
        sessionStorage.setItem('admin', JSON.stringify(this.admin));
      },err=>{console.log(err.error.message)})


    this.webSocketAPI = new WebSocketAPI();
      this.webSocketAPI.r="ref2";
      this.webSocketAPI.i=11110000;

    this.getChart(this.adminService);
this.connect();
this.sendMessage();
this.valuesRT();

  }

getChart(ad:AdminServiceService){



  this.stock = new StockChart({
    chart: {
      events: {
          load: function () {

            let tab:any=[];

              // set up the updating of the chart each second
              var series = this.series[0];

              setInterval(function () {

                let n:Number;

                  var x =(new Date()).getTime(); // current time
                var  y = Math.round(Math.random() * 100);
                ad.getRTValues("ref2").subscribe(
                  data=>{
                    tab=data;

                    series.addPoint([x, tab[tab.length-1]], true, true);

                    console.log(data)
                  },err=>{console.log(err.error.message);}
                )


              }, 1000);
          }
      }
  },

  time: {
      useUTC: false
  },

  rangeSelector: {
      buttons: [{
          count: 1,
          type: 'minute',
          text: '1M'
      }, {
          count: 5,
          type: 'minute',
          text: '5M'
      }, {
          type: 'all',
          text: 'All'
      }],
      inputEnabled: false,
      selected: 0
  },

  title: {
      text: 'Live random data'
  },

  exporting: {
      enabled: false
  },


  series: [  {
    type:undefined,
    name: 'Random data',
    data: (function ()

    {

            var data = [],
            time = (new Date()).getTime(),i;

              for (i = -999; i <= 0; i += 1)
                { console.log(i)
                  data.push(  [ time + i * 1000  ,   Math.round(Math.random() * 12)  ] );
                }
              return data;
    }

    ()

    )

  }    ]

}

);

}

valuesRT(){

  this.adminService.getRTValues("ref2").subscribe(
    data=>{
      this.listValues=data;
        this.v=this.listValues[0];

        this.L=this.listValues.length;
        console.log(this.v);

      console.log(data)
    },err=>{console.log(err.error.message);}
  )


  }







connect(){
  this.webSocketAPI._connect();
}

disconnect(){
  this.webSocketAPI._disconnect();
}

sendMessage(){
  this.webSocketAPI._send();
}

handleMessage(){

  console.log (this.greeting)
}

}
