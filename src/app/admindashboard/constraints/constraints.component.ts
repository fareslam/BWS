import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import notify from 'devextreme/ui/notify';
import { ConstraintCo2 } from '../../models/constraint-co2';


@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {
  dataSource: ConstraintCo2[] = [];
  constraint:any={};
  msg = '';
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.readData();
  }


  readData() {
    this.adminService.listConstraints().subscribe(
      data => {

        this.dataSource = data;

        console.log(data);
      },

      err=> {
        console.log(err);

      }
    );
  }


  addConstraint(event){

    this.adminService.addConstraint(event.data).subscribe(
      data=>{console.log(data);
        notify("Constraint added successfully", "success", 1500);
        this.readData();},
        err=>{
        notify(err.error.message, "warning", 1500);
        this.readData();
        console.log(err.error.message)
      }
    )
    console.log(event)
  }


  removeConstraint(event){

    this.adminService.deleteConstraint(event.data.idConstraint).subscribe(
      data=>{this.msg=data;
        console.log(event.data)
        this.readData();
        notify("Constraint deleted successfully", "success", 1500);
      }

     ,
      err=>{
        notify(err.error.message, "warning", 1500);

      }
    )
  }



 updateConstraint(event){

    this.adminService.updateConstraint(event.data.idConstraint,event.data).subscribe(
      data=>{console.log(data);
        notify("Constraint Updated successfully", "success", 1500);
        this.readData();},
        err=>{
        notify(err.error.message, "warning", 1500);
        this.readData();
        console.log(err.error.message)
      }
    )
    console.log(event)
  }

}
