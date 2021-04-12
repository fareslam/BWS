import { Component, OnInit } from '@angular/core';
import { Space } from 'src/app/models/space';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import notify from 'devextreme/ui/notify';
import { Area } from 'src/app/models/area';
@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent implements OnInit {
  dataSource: Space[] = [];
  areas: Area[] = [];
  xx: Area[] = [];

  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.listSp();
    this.listAr();
    this.listAre();
  }



  listAre()
  {
    this.adminService.listAreas().subscribe(
      data=> {
        this.areas=data;
        console.log(data);
      },
      err=>{
        console.log(err);
          }
    )
  }

  listAr()
  {
    this.adminService.listAreas().subscribe(
      data=> {
        this.xx=data;
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

DeleteArea(event)
{
  this.adminService.deleteArea(event.data.idArea).subscribe(
    data=>{
      console.log(data);
      notify("Area deleted successfully", "success", 1500);
      this.listAr();
    },
    err=>{
      notify(err.error.message, "warning", 1500);
      this.listAr();
      console.log(err.error.message)
    }

  )
}


  listSp()
  {
    this.adminService.listSpaces().subscribe(
      data=> {
        this.dataSource=data;
        console.log(data);
      },
      err=>{
        console.log(err);
          }
    )
  }


  addSpace(event){
    this.adminService.addSpace(event.data).subscribe(
      data=>{
        console.log(data);
        notify("Sapce added successfully", "success", 1500);
        this.listSp();
      },
      err=>{
        notify(err.error.message, "warning", 1500);
        this.listSp();
        console.log(err.error.message)
      }

    )
    }


DeleteSpace(event)
{
  this.adminService.deleteSpace(event.data.idSpace).subscribe(
    data=>{
      console.log(data);
      notify("Space deleted successfully", "success", 1500);
      this.listSp();
    },
    err=>{
      notify(err.error.message, "warning", 1500);
      this.listAr();
      console.log(err.error.message)
    }

  )
}
}
