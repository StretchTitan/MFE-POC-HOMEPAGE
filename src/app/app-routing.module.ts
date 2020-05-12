import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { BananaComponent } from './banana/banana.component';


const routes: Routes = [{
  path: 'home',
  children: [{
    path: 'test',
    component: TestComponent
  }, {
    path: 'banana',
    component: BananaComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
