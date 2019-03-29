import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUiComponent } from './new-ui/new-ui.component';
import { TableViewComponent } from './table-view/table-view.component';
const routes: Routes = [
  { path: 'newui', component: NewUiComponent },
  { path: 'new_table', component: TableViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
