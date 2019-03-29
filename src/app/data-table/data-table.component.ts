import { Component, OnInit, Input, Output, ViewChild, Injectable, EventEmitter, OnChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PersonValidatorService } from './data-table-datasource';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import { ValidatorService, TableDataSource } from 'angular4-material-table';
import {map, startWith} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import {MatTable} from '@angular/material';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [
    {provide: ValidatorService, useClass: PersonValidatorService }
  ],
})
export class DataTableComponent implements OnInit {
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  //dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 // displayedColumns = ['name', 'age'];
 @ViewChild(MatTable) table: MatTable<any>;
 myControl = new FormControl();
  options: string[] = ['DUPLEX FIBER PATCH CORD MM LC-LC 1M OM4','DUPLEX FIBER PATCH CORD MM LC-LC 3M OM4', 'Sudura fibra optica','PATCH PANEL FO 48-SC SX BOX 2U 19" complet echipat cu 48buc adaptori LC Duplex OM4  si 96 buc Pigtail LC OM4', 'Certificare, masuratori si diagrama Fibra Optica', 'Material marunt'];
  filteredOptions: Observable<string[]>;

 constructor(private personValidator: ValidatorService) { }
 displayedColumns = ['NrCrt', 'Descriere','UM','Unitati','PretUnitar', 'PretTotalFaraTVA','actionsColumn','Adaos', 'PretUnitarFabrica', 'TotalCost'];


 @Input() personList = [ 
   {NrCrt: 1, Descriere: 'Fibra optica de 24 multimode OM4', UM: 'ML', Unitati: 4000, PretUnitar: 3.53, PretTotalFaraTVA: 14112.00 },
   {NrCrt: 2, Descriere: 'PATCH PANEL FO 48-SC SX BOX 2U 19" complet echipat cu 48buc adaptori LC Duplex OM4  si 96 buc Pigtail LC OM4', UM: 'Buc', Unitati: 4, PretUnitar: 378.00, PretTotalFaraTVA: 1512.00 },
  // {NrCrt: 3, Descriere: 'PATCH PANEL FO 12-SC SX BOX 1U 19" complet echipat cu 12buc adaptori LC Duplex OM4 si 24 buc Pigtail LC OM4 ', UM: 'Buc', Unitati: 14, PretUnitar: 126.00, PretTotalFaraTVA: 1764.00 },
  ] ;
  @Output() personListChange = new EventEmitter<Person[]>();
 
  
  dataSource: TableDataSource<Person>;
  
  ngOnInit() {
    
    //this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);
    this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));

    this.filteredOptions = this.personValidator.getRowValidator().valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnChanges(changes: this, personList: any): void {
    console.log(changes)
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.getTotalCost();
  }
  getTotalCost() {
    var total = 0;
    for (let index = 0; index < this.personList.length; index++) {
      total = total + this.personList[index].PretTotalFaraTVA;
      this.table.renderRows();
    }
    // this.personList.forEach(element => {
    //   total = total + element.PretTotalFaraTVA;
    // });

    //console.log(this.personList.map(t => t.PretTotalFaraTVA).reduce((acc, value) => acc + value, 0));
    return this.personList.map(t => t.PretTotalFaraTVA).reduce((acc, value) => acc + value, 0);
  }
 
}
class Person {
  Descriere: string;
  NrCrt: number;
  UM: string;
  Unitati: number;
  PretUnitar: number;
  PretTotalFaraTVA: number;
  Adaos: number;
  PretUnitarFabrica: number;
  TotalCost:number;
}
