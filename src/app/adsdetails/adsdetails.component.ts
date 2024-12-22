import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";

//import { Chooser } from '@awesome-cordova-plugins/chooser-simple-file';
import { environment } from "../../environments/environment";

// //import { Chooser } from '@awesome-cordova-plugins/chooser-simple-file';

@Component({
  selector: "app-adsdetails",
  templateUrl: "./adsdetails.component.html",
  styleUrls: ["./adsdetails.component.scss"],
})
export class AdsdetailsComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  adsin: any = "1";
  adsinv1: any;
  adsinv2: any;
  adsinv3: any;
  adsinv4: any;

  adsinv: boolean = false;
  ads_name: any;
  response: any;
  user_id: any;
  company_id: any;
  gstregtype: any = "";
  stateslistdata: any;
  topcategorylistdata: any;
  reffer_id: any;
  value: any;

  shopname: any;
  shopphone: any;
  appsname: any;
  appslink: any;

  profiledata: any = [];
  imagedata: any = [];
  adslist: any = [];
  bankdetails: any = [];
  otherdata: any = [];
  image: any;
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
  start_date: any;
  end_date: any;
  businessdetails: any = [];

  app_ads_id: any;
  app_ads: any;
  ads_details: any;

  // loader indicator
  loaded = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.app_ads_id = localStorage.getItem("app_ads_id");
    this.getshopdetails();
    this.adsdetails();
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

  adsdetails() {
    this.httpclient
      .post(environment.apiBaseUrl + "adsdetails", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          ads_details_id: this.app_ads_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;
        if (this.response.success == true) {
          //     this.otherdata = this.response.data;
          this.ads_details = this.response.data.ads_details;
          console.log(this.response.data.ads_details);
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
}
