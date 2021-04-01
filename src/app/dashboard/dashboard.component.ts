import {  Component, ViewChild, enableProdMode, AfterViewInit }  from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { DxDrawerComponent } from 'devextreme-angular/ui/drawer';


import { Service } from '../services/app.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Service],
})
export class DashboardComponent implements OnInit {
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;

    selectedOpenMode: string = 'shrink';
    selectedPosition: string = 'left';
    selectedRevealMode: string = 'slide';
    isDrawerOpen: Boolean = true;
    elementAttr: any;

    constructor(service: Service,private router: Router) {


    }

    toolbarContent = [{

        widget: 'dxButton',
        location: 'before',
        options: {
            icon: 'menu',
            onClick: () => this.isDrawerOpen = !this.isDrawerOpen
        }
    }];


    ngOnInit() {

    }
}
