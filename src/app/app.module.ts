import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,
   MatTableModule, MatPaginatorModule,
    MatSortModule, MatToolbarModule,
     MatSidenavModule, MatIconModule,
      MatListModule, MatCardModule,
      MatChipsModule,
    MatInputModule, MatDialogModule} from '@angular/material';
import { ProjectSourceComponent } from './project-source/project-source.component';
import { navigation } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { DataTableComponent } from './data-table/data-table.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { NewUiComponent } from './new-ui/new-ui.component';

import { TableViewComponent, SaveDialogTableView } from './table-view/table-view.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {InMemDataService} from '././table-view/in-memory-data.service';
import {TableAppService} from '././table-view/table-view.service';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { CustomerComponent } from './customer/customer.component';
import {SuplierDataService} from './customer/suplier-data.service'
import {CustomerService} from './customer/customer.service';
import { CiorneComponent } from './ciorne/ciorne.component';
import { SigningComponent } from './signing/signing.component'
@NgModule({
  declarations: [
    AppComponent,
    ProjectSourceComponent,
    navigation,
    DataTableComponent,
    NewUiComponent,
    TableViewComponent,
    CustomerComponent,
    SaveDialogTableView,
    CiorneComponent,
    SigningComponent
  ],
  imports: [
    MatChipsModule,
    MatDialogModule,
    HttpClientModule,
    BrowserModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatRadioModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemDataService, { dataEncapsulation: false, delay: 0 }),
   // HttpClientInMemoryWebApiModule.forRoot(SuplierDataService, { dataEncapsulation: false, delay: 0 }),
      
    
  ],
  providers: [TableAppService, CustomerService],
  bootstrap: [AppComponent],
  entryComponents: [SaveDialogTableView]
})
export class AppModule { }
