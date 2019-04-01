import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUiComponent } from './new-ui/new-ui.component';
import { TableViewComponent } from './table-view/table-view.component';
import { navigation } from './navigation/navigation.component'
import {SigningComponent} from './signing/signing.component'
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'new_table', component: TableViewComponent },
  { path: 'home', component: NewUiComponent },
  {path: 'sign/:item', component: SigningComponent, pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
