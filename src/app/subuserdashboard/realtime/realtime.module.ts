import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealtimeRoutingModule } from './realtime-routing.module';
import { RealtimeComponent } from './realtime.component';


@NgModule({
  declarations: [RealtimeComponent],
  imports: [
    CommonModule,
    RealtimeRoutingModule
  ]
})
export class RealtimeModule { }
