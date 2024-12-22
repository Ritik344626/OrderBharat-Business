import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrcodepagewebPage } from './qrcodepageweb.page';

describe('QrcodepagewebPage', () => {
  let component: QrcodepagewebPage;
  let fixture: ComponentFixture<QrcodepagewebPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrcodepagewebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
