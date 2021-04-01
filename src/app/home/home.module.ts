import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbCarouselModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import{OwlModule}from'ngx-owl-carousel';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    OwlModule,
    NgbCarouselModule,
    NgbDropdownModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }


