import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";
import * as htmlToImage from "html-to-image";
import { Filesystem, Directory } from "@capacitor/filesystem";

@Component({
  selector: "app-qrcodeview",
  templateUrl: "./qrcodeview.component.html",
  styleUrls: ["./qrcodeview.component.scss"],
})
export class QrcodeviewComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) { }

  response: any;
  profiledata: any = [];
  imagedata: any = [];
  businessdetails: any = [];
  otherdata: any = [];
  userdetails: any = [];
  image: any;
  user_id: any;
  company_id: any;
  main_url: any;

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
  downloadButtonStatus = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.getshopdetails();
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
          this.userdetails = this.response.data.userdetails;

          this.main_url = this.response.data.main_urlnew;

          // console.log(this.businessdetails);
          console.log(this.otherdata.code);
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

  //share() {
  // SocialSharing.share(
  //   'Order Bharat Business QR Code',
  //   'QR Code',
  //   '',
  //   'https://gbosss.com/storepage?store='+ this.otherdata.code +'&route=qrcode'
  // );
  //location.href="https://gbosss.com/api/pdf?api_key="+this.userdetails.api_key;
  // SocialSharing.share(
  //   this.businessdetails.name,
  //   'Order Bharat Business ' + this.businessdetails.name,
  //   '',
  //   'https://gbosss.com/storepage?store=' + this.userdetails.api_key
  // );
  //}
  upiIdCardDownload() {
    this.downloadButtonStatus = true;
    console.log("image download");
    htmlToImage
      .toJpeg(document.getElementById("upiIdCard"))
      .then(async (dataUrl) => {
        this.downloadButtonStatus = false;

        var link = document.createElement("a");
        link.download = "MyUPI-Print.jpeg";
        link.href = dataUrl;
        // document.appendChild(link);
        document.body.appendChild(link);
        await Filesystem.requestPermissions();
        const savedFile = await Filesystem.writeFile({
          path: "MyUPI-Print.jpeg",
          data: dataUrl,
          directory: Directory.Documents,
        });

        // link.click();
      });
  }
}
