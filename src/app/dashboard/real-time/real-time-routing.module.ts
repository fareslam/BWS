import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealTimeComponent } from './real-time.component';

const routes: Routes = [{ path: '', component: RealTimeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealTimeRoutingModule { }
