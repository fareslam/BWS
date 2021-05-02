import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { LoginComponent } from './login/login.component';
import { SubuserdashboardComponent } from './subuserdashboard/subuserdashboard.component';

const routes: Routes = [

  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }

,
{ path: 'dashboard',
component:DashboardComponent,
children: [
{ path: 'map', loadChildren: () => import('./dashboard/map/map.module').then(m => m.MapModule) },


{ path: 'real-time', loadChildren: () => import('./dashboard/real-time/real-time.module').then(m => m.RealTimeModule) },
{ path: 'profile', loadChildren: () => import('./dashboard/profile/profile.module').then(m => m.ProfileModule) },


{ path: 'rapport', loadChildren: () => import('./dashboard/rapport/rapport.module').then(m => m.RapportModule) },
{ path: 'employspaces', loadChildren: () => import('./dashboard/employspaces/employspaces.module').then(m => m.EmployspacesModule) },

{ path: 'employees', loadChildren: () => import('./dashboard/employees/employees.module').then(m => m.EmployeesModule) }



]},
{path:'login',component:LoginComponent},

{ path: 'admindashboard',
component:AdmindashboardComponent,
children: [
  { path: 'card', loadChildren: () => import('./admindashboard/card/card.module').then(m => m.CardModule) },

  { path: 'users', loadChildren: () => import('./admindashboard/users/users.module').then(m => m.UsersModule) }
,

{ path: 'profile', loadChildren: () => import('./admindashboard/profile/profile.module').then(m => m.ProfileModule) },

  { path: 'spaces', loadChildren: () => import('./admindashboard/spaces/spaces.module').then(m => m.SpacesModule) },
  { path: 'realtime', loadChildren: () => import('./admindashboard/realtime/realtime.module').then(m => m.RealtimeModule) },

  { path: 'areas', loadChildren: () => import('./admindashboard/areas/areas.module').then(m => m.AreasModule) },
  { path: 'clientareas', loadChildren: () => import('./admindashboard/clientareas/clientareas.module').then(m => m.ClientareasModule) }
,
  { path: 'constraints', loadChildren: () => import('./admindashboard/constraints/constraints.module').then(m => m.ConstraintsModule) }
  ,{ path: 'devices', loadChildren: () => import('./admindashboard/devices/devices.module').then(m => m.DevicesModule) },
  { path: 'clientdevices', loadChildren: () => import('./admindashboard/client-devices/client-devices.module').then(m => m.ClientDevicesModule) }
]
},

{ path: 'subuserdashboard',
component:SubuserdashboardComponent,
children: [

  { path: 'map', loadChildren: () => import('./subuserdashboard/map/map.module').then(m => m.MapModule) },

  { path: 'realtime', loadChildren: () => import('./subuserdashboard/realtime/realtime.module').then(m => m.RealtimeModule) },

  { path: 'rapport', loadChildren: () => import('./subuserdashboard/rapport/rapport.module').then(m => m.RapportModule) },
  { path: 'profile', loadChildren: () => import('./subuserdashboard/profile/profile.module').then(m => m.ProfileModule) }


]
},








]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
