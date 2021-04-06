import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { User } from 'src/app/models/user';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import ArrayStore from "devextreme/data/array_store";
import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-clientareas',
  templateUrl: './clientareas.component.html',
  styleUrls: ['./clientareas.component.css']
})
export class ClientareasComponent implements OnInit {
  dataSource = [];
  listca =[];
  msg = '';
  cinu:number;
  idArea:number;
  form:any={};
  users: User[] = [];
  areas:Area[] = [];
  //clients: string[];

  ngOnInit(): void {
    this.listUsers();
    this.listAreas();
    this.listUsersAreas();
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

    listUsersAreas()
    {
      this.adminService.listUserAreas().subscribe(
        data => {

          this.listca = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }



    listAreas() {
      this.adminService.listAreas().subscribe(
        data => {

          this.areas = data;

          console.log(data);
        },

        err=> {
          console.log(err);});}


save(){

  this.form={
    "ua_key":{
      "cinu":this.cinu,
      "idArea":this.idArea
    },
    "number":0
  };
  this.adminService.affectUserArea(this.form).subscribe(

    data=>{
      console.log(data);
      notify("Area assigned successfullt to the user ", "success", 1500);
      this.listUsersAreas();
    },
    err=>{

      notify(err.error.message, "warning", 1500);
    }
  )

}


}
