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
  area:any={};
  msg = '';
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {

  }

addArea(event){
  console.log(event);
}
}
