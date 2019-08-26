import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteDetailsComponent } from './site-details/site-details.component';

const routes: Routes = [
  {
    path: '',
    component: SiteListComponent
  },
  {
    path: 'sites/:id',
    component: SiteDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
