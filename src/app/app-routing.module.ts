import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevgridComponent } from './devgrid/devgrid.component';

const routes: Routes = [
  { path: '', component: DevgridComponent},
  // { path: 'demo', component: DemotableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
