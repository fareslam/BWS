import {  Component, ViewChild, enableProdMode, AfterViewInit }  from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { DxDrawerComponent } from 'devextreme-angular/ui/drawer';

@Component({
  selector: 'app-subuserdashboard',
  templateUrl: './subuserdashboard.component.html',
  styleUrls: ['./subuserdashboard.component.css']
})
export class SubuserdashboardComponent implements OnInit {
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;

  selectedOpenMode: string = 'shrink';
  selectedPosition: string = 'left';
  selectedRevealMode: string = 'slide';
  isDrawerOpen: Boolean = true;
  elementAttr: any;
  admin:any;
  subuser:any;
  subuserRead='ROLE_SUWRITE';
  subuserRoles:any;
  subuserWrite='ROLE_SUWREAD';
  constructor(private router: Router) {


  }


  ngOnInit() {
    this.subuser=JSON.parse( sessionStorage.getItem('auth-user'));
    this.subuserRoles=this.subuser.roles;
console.log("roles"+this.subuserRoles)
  }

  toolbarContent = [{

      widget: 'dxButton',
      location: 'before',
      options: {
          icon: 'menu',
          onClick: () => this.isDrawerOpen = !this.isDrawerOpen
     } },{
        widget: 'dxButton',
        location: 'before',
        options: {
            icon: 'runner',
          onClick: () => this.logout()
        }
       } ];




  logout(){
    window.sessionStorage.clear();
    this.router.navigate(['/login']);

  }
}
