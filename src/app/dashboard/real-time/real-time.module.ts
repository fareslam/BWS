import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from 'angular-highcharts';
import { RealTimeRoutingModule } from './real-time-routing.module';
import { RealTimeComponent } from './real-time.component';


@NgModule({
  declarations: [RealTimeComponent],
  imports: [
    CommonModule,
    RealTimeRoutingModule,
    ChartModule
    
  ]
})
export class RealTimeModule { }
