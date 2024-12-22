import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewsaleComponent } from './addnewsale.component';

describe('AddnewsaleComponent', () => {
  let component: AddnewsaleComponent;
  let fixture: ComponentFixture<AddnewsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewsaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
