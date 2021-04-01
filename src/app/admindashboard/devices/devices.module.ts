import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [DevicesComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    DxDataGridModule,
    DxSelectBoxModule
  ]
})
export class DevicesModule { }
