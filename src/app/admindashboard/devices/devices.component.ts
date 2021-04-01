import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import notify from 'devextreme/ui/notify';
import { Space } from 'src/app/models/space';
import { ConstraintCo2 } from 'src/app/models/constraint-co2';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})

export class DevicesComponent implements OnInit {
  dataSource: Device[] = [];
  dataSource2: Space[] = [];
  dataSource3: ConstraintCo2[] = [];
  dev:any={};
  msg = '';
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
  }
  readData() {
    this.adminService.listdevices().subscribe(
      data => {

        this.dataSource = data;

        console.log(data);
      },

      err=> {
        console.log(err);});}

        listConst() {
          this.adminService.listConstraints().subscribe(
            data => {

              this.dataSource3 = data;

              console.log(data);
            },

            err=> {
              console.log(err);});}


              listSpace() {
                this.adminService.listSpaces().subscribe(
                  data => {

                    this.dataSource2 = data;

                    console.log(data);
                  },

                  err=> {
                    console.log(err);});}







  removeDevice(event) {

    this.adminService.deleteDevice(event.data.reference).subscribe(
      data=>{this.msg=data;
        console.log(event.data)
        this.readData();
        notify("Device deleted successfully", "success", 1500);
      }

     ,
      err=>{
        notify(err.error.message, "warning", 1500);

      }
    )
  }

addDevice(event){

  this.adminService.addDevice(event.data).subscribe(
    data=>{console.log(data);
      notify("Device added successfully", "success", 1500);
      this.readData();},
      err=>{
      notify(err.error.message, "warning", 1500);
      this.readData();
      console.log(err.error.message)
    }
  )
  console.log(event)
}



updateDevice(event){

  this.adminService.addDevice(this.dev).subscribe(
    data=>{console.log(data);
      notify("Device Updated successfully", "success", 1500);
      this.readData();}
      ,
      err=>{
      notify(err.error.message, "warning", 1500);
      this.readData();
      console.log(err.error.message)
          }
  )
  console.log(event)
}

}
