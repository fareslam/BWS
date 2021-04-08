import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { Space } from 'src/app/models/space';
import { UserServiceService } from '../../services/user-service.service';

import ArrayStore from "devextreme/data/array_store";
import notify from 'devextreme/ui/notify';
import { SubUser } from 'src/app/models/sub-user';
@Component({
  selector: 'app-employspaces',
  templateUrl: './employspaces.component.html',
  styleUrls: ['./employspaces.component.css']
})
export class EmployspacesComponent implements OnInit {
  dataSource = [];
  listud =[];
  msg = '';
  cinu:number;
  cin:number;
  idSpace:Number;
  user:any;
  subuser:any;
  reference:String;
  form:any={};
  subusers: SubUser[] = [];
  spaces:Space[] = [];
  //clients: string[];

  ngOnInit(): void {
    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.userService.getuserBySubUser(this.subuser.cin).subscribe(
      data => {
        this.user=data;
        this.cinu=this.user.cinu;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        console.log(this.cinu,"aaaaaaa")
      },

      err => console.log(err));



    this.listSubUsers();
    this.listSpaces();
    this.lisSubUserSpaces();
  }

  constructor(private userService: UserServiceService) {

    }


    listSubUsers()
    {
      this.userService.listSubUserByUser(this.subuser.cin).subscribe(
        data => {

          this.subusers = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }

    lisSubUserSpaces()
    {
      this.userService.newList(this.subuser.cin).subscribe(
        data => {

          this.listud = data;

          console.log(data);
        },

        err=> {
          console.log(err);

        }
      );
    }


    listSpaces(){


      this.userService.SCNDlistUserSpacesperDevice(this.subuser.cin).subscribe(
        data=> {
          this.spaces=data;
          console.log(data);

        },
        err=>{
          console.log(err);
            }
      )


    }


save(){

  this.form={
    "sus_key":{
      "cin":this.cin,
      "idSpace":this.idSpace
    },
    "number":0
  };
  this.userService.affectSubUserSpace(this.form).subscribe(

    data=>{
      console.log(data);
      notify("Device assigned successfullt to the user ", "success", 1500);
     this.lisSubUserSpaces();
    },
    err=>{

      notify(err.error.message, "warning", 1500);
    }
  )

}


}
