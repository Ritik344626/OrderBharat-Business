import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessdetailsComponent } from './businessdetails.component';

describe('BusinessdetailsComponent', () => {
  let component: BusinessdetailsComponent;
  let fixture: ComponentFixture<BusinessdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
