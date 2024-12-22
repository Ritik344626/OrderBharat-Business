import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
//import { SocialSharing } from '@awesome-cordova-plugins/social-sharing';
import { environment } from "../../environments/environment";
// import * as htmlToImage from "html-to-image";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { timeout } from "rxjs";

import html2canvas from 'html2canvas';

import * as QRCode from 'qrcode';

@Component({
  selector: "app-qrcodeview",
  templateUrl: "./qrcodeview.component.html",
  styleUrls: ["./qrcodeview.component.scss"],
})
export class QrcodeviewComponent implements OnInit {

  @ViewChild('captureElement', { static: false }) captureElement: ElementRef;
  image: string;
  //@ViewChild("htmlContent") htmlContent: ElementRef;
  qrCodeData: string = '';
  qrCodeImage: string = '';
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) { }

  response: any;
  profiledata: any = [];
  imagedata: any = [];
  businessdetails: any = null;
  otherdata: any = [];
  userdetails: any = [];
  //image: any;
  user_id: any;
  company_id: any;

  base64File: any = null;

  name: any;
  phone: any;
  email: any;
  gstin: any;
  street: any;
  city: any;
  state: any;
  zip_code: any;
  country: any;

  qrcodelink: any;
  downloadButtonStatus = false;

  main_url: any;
  showQRCode = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.getshopdetails();
    this.generateQRCode();
  }

  getshopdetails() {
    this.httpclient
      .post(environment.apiBaseUrl + "getshopdetails", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.otherdata = this.response.data;
          this.businessdetails = this.response.data.businessdetails;
          this.userdetails = this.response.data.users;
          this.main_url = this.response.data.main_urlnew;

          //  console.log(this.businessdetails);
          //  console.log(this.main_url);

          console.log(this.userdetails);

          console.log(this.userdetails.api_key);

          localStorage.setItem("qrcodelink", "https://orderbharat.com/myshopdetails?sd=" + this.company_id + "&ap=" + this.userdetails.api_key);

          console.log("https://orderbharat.com/myshopdetails?sd=" + this.company_id + "&ap=" + this.userdetails.api_key);
        } else if (this.response.success == false) {
          Swal.fire({
            title: "Oops...",
            text: this.response.data.message,
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      });
  }


  upiIdCardDownload() {
    this.downloadButtonStatus = true;
 //   const cardTag = document.getElementById("upiIdCard");
    console.log("image download");

  }
  async download(dataUrl) {
    await Filesystem.requestPermissions();
    const savedFile = await Filesystem.writeFile({
      path: "MyUPI-Print.jpeg",
      data: dataUrl,
      directory: Directory.Documents,
    });
  }
  downloadQRCode() {
    this.showQRCode = true;
    setTimeout(() => {
      this.showQRCode = false;
    }, 2000);
  }

  // async share() {
  //   await Share.share({
  //     title: "Order Bharat QR Code",
  //     text: "QR Code",
  //     url: "https://gbosss.com/assets/order_bharat/qr/order-bharat-qr-code-"+this.company_id+".jpg",
  //     dialogTitle: "Share Order Bharat QR Code",
  //   });
  // }
  //myshopdetails?sd=281&ap=ttttttttttttttttttttttt



  ngAfterViewInit() {
    this.qrcodelink = localStorage.getItem("qrcodelink");

    QRCode.toDataURL(this.qrCodeData)
      .then(url => {
        this.qrCodeImage = this.qrcodelink;

      })
      .catch(err => {
        console.error(err);
      });

    setTimeout(() => {
      this.capture();
    }, 2000); // Adjust the delay as needed
  }

  capture() {
  //  console.log('Starting capture');
    html2canvas(this.captureElement.nativeElement).then(canvas => {
      console.log('Capture complete');
      this.image = canvas.toDataURL('image/png');
    }).catch(error => {
      console.error('Error capturing the image:', error);
    });
  }


  generateQRCode() {

    this.qrcodelink = localStorage.getItem("qrcodelink");

    //this.qrCodeImage =this.qrcodelink;

    const urlToEncode = this.qrcodelink;
    QRCode.toDataURL(urlToEncode)
      .then(url => {
        this.qrCodeImage = url;
      })
      .catch(err => {
        console.error(err);
      });
  }

  async reloadAndShare() {
    if (!this.image) {
      await this.capture();
    }

    const base64Data = this.image.split(',')[1];

    const fileName = 'qr-code.png';

    try {
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache,
      });

      const uri = result.uri;

      await Share.share({
        title: 'Order Bharat QR Code',
        text: 'Order Bharat QR Code scan and order now!',
        url: uri,
        dialogTitle: 'Share Order Bharat QR Code',
      });
    } catch (error) {
      console.error('Error sharing the image:', error);
    }
  }



}
