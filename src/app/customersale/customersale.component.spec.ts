import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersaleComponent } from './customersale.component';

describe('CustomersaleComponent', () => {
  let component: CustomersaleComponent;
  let fixture: ComponentFixture<CustomersaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
