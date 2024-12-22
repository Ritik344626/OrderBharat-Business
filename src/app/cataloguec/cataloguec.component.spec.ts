import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguecComponent } from './cataloguec.component';

describe('CataloguecComponent', () => {
  let component: CataloguecComponent;
  let fixture: ComponentFixture<CataloguecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CataloguecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CataloguecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
