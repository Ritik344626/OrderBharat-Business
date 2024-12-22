import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { TokenService } from '../Services/token.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-qrcodepageweb',
  templateUrl: './qrcodepageweb.page.html',
  styleUrls: ['./qrcodepageweb.page.scss'],
  standalone: true,
  imports: [

    CommonModule,
    IonicModule,
    ZXingScannerModule
  ],
})
export class QrcodepagewebPage implements OnInit {

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;

  isSupported = false;
 // barcodes: Barcode[] = [];
  // httpclient: any;
  // Token: any;

  scanResult: any = 'Invalid barcode';
  response: any;
  visitor_id: any;
  user_id: any;
  company_id: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem('user_id');
    this.company_id = localStorage.getItem('company_id');
  }

  hasDevices: boolean;
  hasPermission: boolean;
  isScanning: boolean = true;
  qrResultString: any;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(
    private alertController: AlertController,
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    public loadingController: LoadingController,
  ) { }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.callapi(resultString);
    this.isScanning = false;
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  openFormatsDialog() {
  }

  close() {
    this.router.navigateByUrl('/scannapp')
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  callapi(scanData: any) {
    console.log('call api called', scanData)
    let inputData = [
      {
        // api_key:
        //   '$2a$15$OftkLBcjf56ittEHiJOQbeIgNQvYNBTcGsHIoOYjGS/EB6XI/KyNO',
        // customer_mobile_id: this.visitor_id,
        visitor_id: this.company_id,
        store: scanData,
        type: '2'
      },
    ];
    const params = new URLSearchParams();
    params.set('store', this.qrResultString); // Assuming 'store' is the only param needed

    // If you need to send more parameters:
    params.set('visitor_id', this.company_id); // Uncomment if required
    // params.set('customer_mobile_id', this.visitor_id); // Uncomment if required
    params.set('type', '2');

    this.httpclient
      .post('https://www.orderbharat.com/api/pageverifybyapikeyweb?' + params.toString(), null)
      // ...
      .subscribe((res: any) => {
        this.response = res;
        //this.scanResult="Valid Store";

        console.log(this.response.data.company_id);
        console.log(this.response.data.user_id);
        if (this.response.success == true) {
          // localStorage.setItem('company_id', this.response.data.company_id);
          // localStorage.setItem('vendor_id', this.response.data.company_id);
          // localStorage.setItem('user_id', this.response.data.user_id);

          this.scanResult = 'Valid Store';
          this.isScanning = false;
          this.router.navigateByUrl('/home');
        } else if (this.response.success == false) {
          this.scanResult = 'Invalid Store';
        }
      });

    // this.scanResult = 'Valid Store';
    // this.router.navigate(['/cataloguec']);

    ////////////////////////////////////////////////
    //}
  }

  async testApi(): Promise<void> {
    // alert(this.visitor_id);
    this.scanResult = 'Invalid Store';

    //if (barcodes[0].rawValue.length > 0) {
    ///////////////////////////////////////
    let inputData = [
      {
        //  // api_key:
        //     '$2a$15$OftkLBcjf56ittEHiJOQbeIgNQvYNBTcGsHIoOYjGS/EB6XI/KyNO',
        //customer_mobile_id: '271',
        store: 'cd26a4febf8c5af5434a94f9e78b037c',
      },
    ];

    // dynamic data
    /* let inputData = [
       {
         api_key:
           '$2a$15$OftkLBcjf56ittEHiJOQbeIgNQvYNBTcGsHIoOYjGS/EB6XI/KyNO',
         customer_mobile_id: this.visitor_id,
         store: this.barcodes[0].rawValue,
       },
     ];*/


  //   ///////////////////////////////////////
    this.httpclient
      .post(this.Token.baseurl() + 'pageverifybyapikey', inputData)
      // .post(this.Token.baseurl() + 'pageverifybyapikey', inputData)
      .subscribe((res: any) => {
        this.response = res;
        console.log(this.response)
        this.scanResult = "Valid Store";

        // console.log(this.response.data.company[0].id);
        // console.log(this.response.data.user[0].id);
        if (this.response.success == true) {
          // localStorage.setItem('company_id', this.response.data.company[0].id);
          // localStorage.setItem('vendor_id', this.response.data.company[0].id);
          // localStorage.setItem('user_id', this.response.data.user[0].id);

          this.scanResult = 'Valid Store';
          this.router.navigate(['/cataloguec']);
        } else if (this.response.success == false) {
          this.scanResult = 'Invalid Store';
        }
      });

    // this.scanResult = 'Valid Store';
    // this.router.navigate(['/cataloguec']);

    ////////////////////////////////////////////////
    //}
  }
}

