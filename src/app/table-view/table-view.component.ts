
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { User, IUserResponse } from './user.class';
import { FormBuilder, FormGroup } from '@angular/forms';

import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { MatAutocompleteSelectedEvent, MatTableDataSource } from '@angular/material';
import { TableAppService } from './table-view.service';
import { MatTable } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  projectName: string;
  draft: boolean;
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})


export class TableViewComponent implements OnInit {
  projectName: string;
  draft: boolean
  displayedColumns: string[] = ['id', 'nrcrt', 'name', 'um', 'quantity', 'taxed_value', 'taxed_price', 'tax', 'value', 'price', 'remove_columm'];
  filteredUsers: User[] = [];
  usersForm: FormGroup;
  isLoading = false;
  @ViewChild(MatTable) table: MatTable<any>;
  //public data:[{id:any, name:any}] = [{id:null, name:null}];
  public userData: any = []
  public dataSource: any;
  constructor(private fb: FormBuilder, private appService: TableAppService, public dialog: MatDialog) { }

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null,

    })

    this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.appService.search({ name: value }, 1)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(users => this.filteredUsers = users.results);

  }

  addToDB() {
    console.log(this.usersForm.get('userInput').value)
  }

  getTotalCost() {
    let sum = 0;
    this.userData.forEach(element => {
      sum = sum + element.taxed_price;
    });
    //console.log(sum);
    return sum;
    //return this.userData.map(t => t.value, p => p.tva).reduce((acc, value, tva) => acc + value*(1+(tva/100)), 0);
  }

  getProjectCost() {
    let sum = 0;
    this.userData.forEach(element => {
      sum = sum + element.value * element.quantity;
    });
    //console.log(sum);
    return sum;
    //return this.userData.map(t => t.value, p => p.tva).reduce((acc, value, tva) => acc + value*(1+(tva/100)), 0);
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value)
    this.userData.push(event.option.value);
    var i = 1;
    this.userData.forEach(element => {
      element.nrcrt = i;
      //element.tva = 30;
      i++;
    });
    console.log(this.userData);
    this.dataSource = new MatTableDataSource<Element>(this.userData);
    this.getTotalCost()
    this.table.renderRows();
    this.usersForm.setValue({ userInput: '', });
    //this.usersForm.value.userInput.setValue('');

  }

  reload() {
    var i = 1;
    this.userData.forEach(element => {
      element.nrcrt = i;
      //element.tva = 30;
      i++;
    });
    this.getTaxedValue()
    this.getTaxedPrice()
    console.log(this.userData);
    this.dataSource = new MatTableDataSource<Element>(this.userData);
    this.getTotalCost()
    this.table.renderRows();
  }


  setValue() { this.usersForm.setValue({ userInput: '' }); }

  getTaxedValue(){
    this.userData.forEach(element => {
      element.taxed_value = element.value * (1 + (element.tax/100));
    });
  }
 getTaxedPrice(){
  this.userData.forEach(element => {
    element.taxed_price = element.taxed_value * element.quantity;
    element.price = element.value * element.quantity;
  });
 }
remove(index:number){
  console.log(index);
  this.userData.splice(index-1, 1);
  this.reload();
}

  displayFn(user: User) {
    if (user) { return user.name; }

  }

  saveDialog(): void {
    const dialogRef = this.dialog.open(SaveDialogTableView, {
      width: '350px',
      data: {projectName: this.projectName, draft: this.draft}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.draft = result;
    });
  }
  

}

@Component({
  selector: 'save-dialog-table-view',
  templateUrl: 'save-dialog-table-view.html',
})
export class SaveDialogTableView {

  constructor(
    public dialogRef: MatDialogRef<SaveDialogTableView>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveAsDraft(){

  }
  sendToAprooval(){

  }

}

