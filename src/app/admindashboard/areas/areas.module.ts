import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [AreasComponent],
  imports: [
    CommonModule,DxDataGridModule, DxSelectBoxModule,
    AreasRoutingModule
  ]
})
export class AreasModule { }
