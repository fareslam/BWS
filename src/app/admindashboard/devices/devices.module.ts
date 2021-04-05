import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxLookupModule } from 'devextreme-angular';


@NgModule({
  declarations: [DevicesComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    DxDataGridModule,DxLookupModule,
    DxSelectBoxModule
  ]
})
export class DevicesModule { }
