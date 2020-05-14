import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { ChannelsComponent } from './channels/channels.component';


const routes: Routes = [{
  path: 'home',
  children: [{
    path: 'equipment',
    component: EquipmentComponent
  }, {
    path: 'channels',
    component: ChannelsComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
