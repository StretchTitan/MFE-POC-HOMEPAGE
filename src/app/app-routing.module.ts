import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { ChannelsComponent } from './channels/channels.component';
import { EmptyComponent } from './empty/empty.component';

const routes: Routes = [
  {
    path: 'home',
    component: EmptyComponent,
  },
  {
    path: 'home/equipment',
    component: EquipmentComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/channels',
    component: ChannelsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
