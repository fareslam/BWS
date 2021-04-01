import {  Component, ViewChild, enableProdMode, AfterViewInit }  from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { DxDrawerComponent } from 'devextreme-angular/ui/drawer';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;

    selectedOpenMode: string = 'shrink';
    selectedPosition: string = 'left';
    selectedRevealMode: string = 'slide';
    isDrawerOpen: Boolean = true;
    elementAttr: any;

    constructor(private router: Router) {


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
