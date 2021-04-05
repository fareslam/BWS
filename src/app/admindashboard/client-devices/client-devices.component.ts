import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { User } from 'src/app/models/user';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import ArrayStore from "devextreme/data/array_store";
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-client-devices',
  templateUrl: './client-devices.component.html',
  styleUrls: ['./client-devices.component.css']
})
export class ClientDevicesComponent implements OnInit {
  dataSource = [];
  listud =[];
  msg = '';
  cinu:number;
  reference:String;
  form:any={};
  users: User[] = [];
  devices:Device[] = [];
  //clients: string[];

  ngOnInit(): void {
    this.listUsers();
    this.listDevices();
    this.listUsersDevice();
  }

  constructor(private adminService: AdminServiceService) {

    }


    listUsers()
    {
      this.adminService.listUsers().subscribe(
        data => {

          this.users = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }

    listUsersDevice()
    {
      this.adminService.listUserDevices().subscribe(
        data => {

          this.listud = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }



    listDevices() {
      this.adminService.listdevices().subscribe(
        data => {

          this.devices = data;

          console.log(data);
        },

        err=> {
          console.log(err);});}


save(){

  this.form={
    "udk":{
      "cinu":this.cinu,
      "reference":this.reference
    },
    "number":0
  };
  this.adminService.affectUserDevice(this.form).subscribe(

    data=>{
      console.log(data);
      notify("Device assigned successfullt to the user ", "success", 1500);
      this.listUsersDevice();
    },
    err=>{

      notify(err.error.message, "warning", 1500);
    }
  )

}


}
