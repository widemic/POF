import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {ThemePalette} from '@angular/material/core';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-new-ui',
  templateUrl: './new-ui.component.html',
  styleUrls: ['./new-ui.component.scss']
})
export class NewUiComponent implements OnInit {
public data: [{val:any}][]=[]


  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

    this.data = JSON.parse(localStorage.getItem('keys'))
    console.log(this.data)
  }
openTable(item){
  console.log(item)
}
availableColors: ChipColor[] = [
  {name: 'nesemnat', color: 'warn'},
  {name: 'semnat', color: 'primary'},
  {name: 'nesemnat', color: 'primary'},
  {name: 'nesemnay', color: 'warn'}
];

}
