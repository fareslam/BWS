import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesRoutingModule } from './spaces-routing.module';
import { SpacesComponent } from './spaces.component';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';



@NgModule({
  declarations: [SpacesComponent],
  imports: [
    CommonModule,DxDataGridModule, DxSelectBoxModule ,
    SpacesRoutingModule
  ]
})
export class SpacesModule { }
