import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import {DxFormModule,
} from 'devextreme-angular';
import { DxTextBoxModule,  DxButtonModule } from "devextreme-angular";
@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,DxFormModule,DxTextBoxModule,  DxButtonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
