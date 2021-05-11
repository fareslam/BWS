import {  Component, ViewChild, enableProdMode, AfterViewInit }  from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { SubUser } from 'src/app/models/sub-user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { TestServiceService } from 'src/app/services/test-service.service';
import notify from 'devextreme/ui/notify';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  password:string;
  username:string;
  user:any;
  imageurl:String;
  subuser:any={};
  form:any={};
  img: any[] = [];
  su:any;
  constructor( private authService: AuthService,
    private tokenService: TokenStorageService,private router: Router,private testService:TestServiceService) { }

  ngOnInit(): void {

    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.su= JSON.stringify(this.subuser);
  //  console.log("SUUU"+this.su)

  }
  save(){

this.form={

  "name":this.subuser.name,
  "surname":this.subuser.surname,
  "username":this.subuser.username,

  "dateBirth":this.subuser.dateBirth,
  "password":this.subuser.password,
 "imageurl":  "../../../assets/"+this.img[0]["name"]

}


this.testService.updateProfile(this.subuser.cin,this.form).subscribe(
  res=>{

   window.sessionStorage.clear()
   this.authService.login(this.form).subscribe(
     data => {
       this.tokenService.saveToken(data.token);
       this.tokenService.saveUser(data);
    //   location.reload()
       this.ngOnInit()

     },
     err => { console.log(err)
   }
   );

   notify("Account updated successfully", "success", 1500);
   console.log(res)

 },
 err=>{console.log(err);
  notify(err.error.message, "warning", 1500);}
 )
}

}
