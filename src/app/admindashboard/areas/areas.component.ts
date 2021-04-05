import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  dataSource: Area[] = [];

  msg = '';
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.listAr();

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
}
