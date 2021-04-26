import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportRoutingModule } from './rapport-routing.module';
import { RapportComponent } from './rapport.component';
import { DxCheckBoxModule,DxFormModule} from 'devextreme-angular';

@NgModule({
  declarations: [RapportComponent],
  imports: [
    CommonModule,
    RapportRoutingModule,
    DxFormModule,
    DxCheckBoxModule
  ]
})
export class RapportModule { }
