import { Component, OnInit,OnChanges } from '@angular/core';
import { Device } from 'src/app/models/device';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import notify from 'devextreme/ui/notify';
import { Space } from 'src/app/models/space';
import { ConstraintCo2 } from 'src/app/models/constraint-co2';
import { Area } from 'src/app/models/area';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})

export class DevicesComponent implements OnInit{
device:Device;
currentDevice: Device = new Device();
popupVisible = false;
popupUpdate = false;
name:String;
idSpace:Number;
idConstraint:Number;

popupAdd = false;
popupDelete = false;
space:Space;
constraint:ConstraintCo2;
dataSource: Device[] = [];
spaces: Space[] = [];
nameS:String;
nameC:String;
reference:String;

password:string;
username:string;

form:any={};
 cons: ConstraintCo2[];
 msg = '';
constructor(private adminService: AdminServiceService) {
  this.adminService.listdevices().subscribe(
    data => {

      this.currentDevice = data;

      console.log(data);
    },

    err=> {
      console.log(err.error.message);});
}

ngOnInit(): void
{this.readData();


this.listSp();
this.listConst();}



readData() {
  this.adminService.listdevices().subscribe(
    data => {

      this.dataSource = data;

      console.log(data);
    },

    err=> {
      console.log(err.error.message);});}

      listConst() {
        this.adminService.listConstraints().subscribe(
          data => {

            this.cons = data;

            console.log(this.cons);
          },

          err=> {
            console.log("no consss");

          })
            }






          listSp()
           {
             this.adminService.listSpaces().subscribe(
               data=> {
                 this.spaces=data;
                 console.log(data);
                      },
                      err=>{
                        console.log(err.error.message);
                          }
                    )
                  }



showInfo(device) {
    this.device = device;
    this.popupVisible = true;

  this.adminService.getSpace(this.device.idSpace).subscribe(
    data=>{this.space=data;
            this.nameS=this.space.name+"\n\nLongitude="+this.space.longitude+"\n\n Latitude="+this.space.latitude;
      },
    err=>{console.log(err.error.message)}
  )

  this.adminService.getConstraint(this.device.idConstraint).subscribe(
    data=>{this.constraint=data;
            this.nameC=this.constraint.nameConstraint+"\n\ Min Value="+this.constraint.min_value+" °C"+
            "\n\n Max Value="+this.constraint.max_value+" °C";
      },
    err=>{console.log(err.error.message)}
  )
}


deleteDevice(device){
  this.device = device;
this.popupDelete = true;

}

updateDevice(device){
  this.device = device;
this.popupUpdate = true;

}


save(device){

  this.device=device;
  this.adminService.updateDevice(this.device.reference,this.device).subscribe(
    data=>{

      notify("Device updated successfully", "success", 1500);
      this.popupUpdate = false;
      this.readData();
    },
    err=>{
      notify(err.error.message, "warning", 1500);

    }
  )
  console.log(this.device)}


  delete(device){
    this.device=device;
    this.adminService.deleteDevice(this.device.reference).subscribe(
      data=>{this.msg=data;


                            this.popupDelete = false;

                            notify("Device deleted successfully", "success", 1500);
                          window.location.reload()

                          }

                         ,
                          err=>{
                            notify(err.error.message, "warning", 1500);

                          }
                        )

  }



  addDev(device){
    this.device = device;
  this.popupAdd = true;

  }

  add(){

    this.form={
      "reference":this.reference,
      "name":this.name,
      "idSpace":this.idSpace,
      "idConstraint":this.idConstraint
    }



    this.adminService.addDevice(this.form).subscribe(
      data=>{console.log(data);
        notify("Device added successfully", "success", 1500);


        this.popupAdd = false;

        window.location.reload()
      },
        err=>{
        notify(err.error.message, "warning", 1500);

        console.log(err.error.message)
      }
    )


  }
}
