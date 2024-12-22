import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessqueryComponent } from './businessquery.component';

describe('BusinessqueryComponent', () => {
  let component: BusinessqueryComponent;
  let fixture: ComponentFixture<BusinessqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
