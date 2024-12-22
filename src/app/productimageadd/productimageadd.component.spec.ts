import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductimageaddComponent } from './productimageadd.component';

describe('ProductimageaddComponent', () => {
  let component: ProductimageaddComponent;
  let fixture: ComponentFixture<ProductimageaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductimageaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductimageaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
