import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingserviceComponent } from './messagingservice.component';

describe('MessagingserviceComponent', () => {
  let component: MessagingserviceComponent;
  let fixture: ComponentFixture<MessagingserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagingserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
