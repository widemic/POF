
import { Component, OnInit, ViewChild } from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {Suplier,IProductsResponse} from './suplier.class';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs'
import { MatAutocompleteSelectedEvent, MatTableDataSource } from '@angular/material';
import {CustomerService} from './customer.service';
import {MatTable} from '@angular/material';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['NrCrt',
   'Descriere',
   'UM',
   'Unitati',
   'PretUnitar',
    'PretTotalFaraTVA',
    'actionsColumn',
    'Adaos',
     'PretUnitarFabrica',
      'TotalCost'];

  filteredUsers: Suplier[] = [];
  usersForm: FormGroup;
  isLoading = false;
  @ViewChild(MatTable) table: MatTable<any>;
  //public data:[{id:any, name:any}] = [{id:null, name:null}];
  public userData : any =[{}]
  public dataSource: any;
  constructor(private fb: FormBuilder, private appService: CustomerService) {}

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null
    })

      this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.appService.search({name: value}, 1)
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => this.filteredUsers = users.results);
      
  }

getTotalCost() {
  return this.userData.map(t => t.value).reduce((acc, value) => acc + value, 0);
}

onSelectionChanged(event: MatAutocompleteSelectedEvent) {
  console.log(event.option.value)
  this.userData.push(event.option.value)
  console.log(this.userData);
  this.dataSource = new MatTableDataSource<Element>(this.userData);
 
    /* delete logic here */
    this.getTotalCost()
    this.table.renderRows();
    
  
}

  displayFn(user: Suplier) {
    if (user) { return user.name; }
    
  }
}
