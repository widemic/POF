import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiorneComponent } from './ciorne.component';

describe('CiorneComponent', () => {
  let component: CiorneComponent;
  let fixture: ComponentFixture<CiorneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiorneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiorneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
