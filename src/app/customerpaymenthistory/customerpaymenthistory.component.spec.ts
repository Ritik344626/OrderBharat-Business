import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerpaymenthistoryComponent } from './customerpaymenthistory.component';

describe('CustomerpaymenthistoryComponent', () => {
  let component: CustomerpaymenthistoryComponent;
  let fixture: ComponentFixture<CustomerpaymenthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerpaymenthistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerpaymenthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
