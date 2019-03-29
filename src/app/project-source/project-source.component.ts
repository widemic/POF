import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ProjectSourceDataSource } from './project-source-datasource';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-project-source',
  templateUrl: './project-source.component.html',
  styleUrls: ['./project-source.component.scss']
})
export class ProjectSourceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ProjectSourceDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['NrCrt', 'Descriere', 'UM', 'Unitati', 'PretUnitar', 'PretTotalFaraTVA'];

  
  ngOnInit() {
    this.dataSource = new ProjectSourceDataSource(this.paginator, this.sort);
  }
}

// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { TableDataSource, ValidatorService } from 'angular4-material-table';

// import { PersonValidatorService } from './person-validator.service';
// import { Person } from './person';
// import {FormControl} from '@angular/forms';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';

// @Component({
//   providers: [
//     {provide: ValidatorService, useClass: PersonValidatorService }
//   ],
//   selector: 'app-project-source',
//   templateUrl: './project-source.component.html',
//      styleUrls: ['./project-source.component.scss']
// })
// export class ProjectSourceComponent implements OnInit {

//   myControl = new FormControl();
//   options: string[] = ['One', 'Two', 'Three'];
//   filteredOptions: Observable<string[]>;

//   constructor(private personValidator: ValidatorService) { }

//   displayedColumns = ['name', 'age', 'actionsColumn'];

//   @Input() personList = [ 
//     { name: 'Mark', age: 15 },
//     { name: 'Brad', age: 50 },
//     ] ;
//   @Output() personListChange = new EventEmitter<Person[]>();

//   dataSource: TableDataSource<Person>;


//   ngOnInit() {
//     this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);
//     this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));

//     this.filteredOptions = this.myControl.valueChanges.pipe(
//       startWith(''),
//       map(value => this._filter(value))
//     );
//   }
//   private _filter(value: string): string[] {
//     const filterValue = value.toLowerCase();

//     return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
//   }
// }