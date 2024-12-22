import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";

//import { Chooser } from '@awesome-cordova-plugins/chooser-simple-file';
import { environment } from "../../environments/environment";

@Component({
  selector: "app-appads",
  templateUrl: "./appads.component.html",
  styleUrls: ["./appads.component.scss"],
})
export class AppadsComponent implements OnInit {
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

  // loader indicator
  loaded = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.getprofiledetail();
    this.getadslist();
  }

  chkgstin() {
    if (this.adsin == 1) {
      this.adsinv = true;
      this.adsinv1 = false;
      this.adsinv2 = false;
      this.adsinv3 = false;
    } else if (this.adsin == 2) {
      this.adsinv1 = false;
      this.adsinv = true;
      this.adsinv2 = false;
      this.adsinv3 = true;
    } else if (this.adsin == 3) {
      this.adsinv2 = false;
      this.adsinv = false;
      this.adsinv1 = true;
      this.adsinv3 = false;
    } else if (this.adsin == 4) {
      this.adsinv2 = true;
      this.adsinv = false;
      this.adsinv1 = false;
      this.adsinv3 = false;
    } else {
      this.adsinv = true;
      this.adsinv1 = false;
      this.adsinv2 = false;
      this.adsinv3 = false;
    }
  }

  onItemChange(value: any) {
    console.log(" Value is : ", value);
  }

  getadslist() {
    this.httpclient
      .post(environment.apiBaseUrl + "getadslist", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.otherdata = this.response.data;
          console.log(this.otherdata);
          this.adslist = this.response.data.adslist;
        } else if (this.response.success == false) {
          // Swal.fire({
          //   title: "Oops...",
          //   text: this.response.data.message,
          //   icon: "warning",
          //   confirmButtonText: "Ok",
          // });
        }
      });
  }

  getprofiledetail() {
    console.log(this.company_id);
    this.httpclient
      .post(environment.apiBaseUrl + "getprofiledetail", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.profiledata = this.response.data.profiledata;
          this.imagedata = this.response.data.imagedata;

          if (this.profiledata.name != 0) {
            this.name = this.profiledata.name;
          } else {
            this.name = null;
          }

          if (this.profiledata.phone != 0) {
            this.phone = this.profiledata.phone;
          } else {
            this.phone = null;
          }

          if (this.profiledata.email != 0) {
            this.email = this.profiledata.email;
          } else {
            this.email = null;
          }

          if (this.profiledata.gstin != 0) {
            this.gstin = this.profiledata.gstin;
          } else {
            this.gstin = null;
          }

          if (this.profiledata.state != 0) {
            this.state = this.profiledata.state;
          } else {
            this.state = null;
          }

          if (this.profiledata.street != 0) {
            this.street = this.profiledata.street;
          } else {
            this.street = null;
          }

          if (this.profiledata.city != 0) {
            this.city = this.profiledata.city;
          } else {
            this.city = null;
          }

          if (this.profiledata.zip_code != 0) {
            this.zip_code = this.profiledata.zip_code;
          } else {
            this.zip_code = null;
          }

          if (this.profiledata.country != 0) {
            this.country = this.profiledata.country;
          } else {
            this.country = null;
          }

          if (this.imagedata != null) {
            this.image =
              "https://gbosss.com/assets/images/business/" +
              this.imagedata.image;
          } else {
            this.image = "assets/images/demo.jpg";
          }
        } else if (this.response.success == false) {
          // Swal.fire({
          //   title: "Oops...",
          //   text: this.response.data.message,
          //   icon: "warning",
          //   confirmButtonText: "Ok",
          // });
        }
      });
  }

  submitquery() {
    this.httpclient
      .post(environment.apiBaseUrl + "updatedetailsstep2", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          appsname: this.appsname,
          appslink: this.appslink,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.router.navigate(["/home"]);
        } else if (this.response.success == false) {
          // Swal.fire({
          //   title: "Oops...",
          //   text: this.response.data.message,
          //   icon: "warning",
          //   confirmButtonText: "Ok",
          // });
        }
      });
  }

  adsdetails(id: any) {
    localStorage.setItem("app_ads_id", id);
    this.router.navigate(["/adsdetails"]);
  }
}
