import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MkeditComponent } from './mkedit.component';

describe('MkeditComponent', () => {
  let component: MkeditComponent;
  let fixture: ComponentFixture<MkeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MkeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MkeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
