import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YougotComponent } from './yougot.component';

describe('YougotComponent', () => {
  let component: YougotComponent;
  let fixture: ComponentFixture<YougotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YougotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YougotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
