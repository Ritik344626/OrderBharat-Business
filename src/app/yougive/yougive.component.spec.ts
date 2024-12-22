import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YougiveComponent } from './yougive.component';

describe('YougiveComponent', () => {
  let component: YougiveComponent;
  let fixture: ComponentFixture<YougiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YougiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YougiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
