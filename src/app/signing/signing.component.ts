import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {
  item: any;
  private sub: any;
  projectName: string;
  clientName: string;
  draft: boolean
  displayedColumns: string[] = ['id', 'nrcrt', 'name', 'um', 'quantity', 'taxed_value', 'taxed_price', 'tax', 'value', 'price'];
 
  isLoading = false;
  @ViewChild(MatTable) table: MatTable<any>;
  //public data:[{id:any, name:any}] = [{id:null, name:null}];
  public userData: any = []
  public dataSource: any;
  public status: any[] = [];

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      this.item = params['item']; // (+) converts string 'id' to a number
      console.log(this.item)
      if (this.item) {
        this.itemReload(this.item);
      }
      // In a real app: dispatch action to load the details here.
    });


  }


  itemReload(z: any) {
    this.userData = JSON.parse(localStorage.getItem(z));
    //this.reload();
    console.log(z);
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

  local() {
    this.userData = JSON.parse(localStorage.getItem(this.projectName));
    this.reload()

  }
  reload() {
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
  }
signDialog(){
 
}

}
