import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AdminServiceService } from '../../services/admin-service.service';
import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  cin: Number;
  dataSource: User[] = [];
  msg = '';
  signup:any={};

  constructor(private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.readData();
  }

  readData() {
    this.adminService.listUsers().subscribe(
      data => {

        this.dataSource = data;

        console.log(data);
      },

      err=> {
        console.log(err);

      }
    );
  }



  deleteData(event) {

    this.adminService.deleteUser(event.data.cin).subscribe(
      data=>{this.msg=data;
        console.log(event.data)
        this.readData();
        notify("User deleted successfully", "success", 1500);
      }

     ,
      err=>{
        notify(err.error.message, "warning", 1500);

      }
    )
  }



  insertData(event) {
    this.signup={
      "cin":event.data.cin,
      "username": event.data.subuser.username,
      "password": event.data.subuser.password,
      "email":event.data.subuser.email,
      "dateBirth":event.data.subuser.dateBirth,
      "name":event.data.subuser.name,
      "surname":event.data.subuser.surname,
      "tel":event.data.subuser.tel
    };

    this.adminService.addUser(this.signup).subscribe(
      data=>{console.log(data);
        notify("User added successfully", "success", 1500);
        this.readData();},
        err=>{
        notify(err.error.message, "warning", 1500);
        this.readData();
        console.log(err.error.message)
      }
    )
  }
}
