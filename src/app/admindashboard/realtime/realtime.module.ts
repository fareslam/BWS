import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealtimeRoutingModule } from './realtime-routing.module';
import { RealtimeComponent } from './realtime.component';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';


@NgModule({
  declarations: [RealtimeComponent],
  imports: [
    CommonModule,ChartModule,
    RealtimeRoutingModule
  ]
})
export class RealtimeModule { }
