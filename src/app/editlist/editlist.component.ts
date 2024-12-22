import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";

//import { Chooser } from '@awesome-cordova-plugins/chooser-simple-file';
import { environment } from "../../environments/environment";

@Component({
  selector: "app-editlist",
  templateUrl: "./editlist.component.html",
  styleUrls: ["./editlist.component.scss"],
})
export class EditlistComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  profiledata: any = [];
  imagedata: any = [];
  businessdetails: any = [];
  bankdetails: any = [];
  otherdata: any = [];
  image: any;
  user_id: any;
  company_id: any;

  base64File: any = null;

  name: any;
  phone: any;
  email: any;
  gstin: any;
  upi_id: any;
  street: any;
  city: any;
  state: any;
  zip_code: any;
  country: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.getprofiledetail();
    this.getshopdetails();
  }

  getprofiledetail() {
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

          if (this.profiledata.upi_id != 0) {
            this.upi_id = this.profiledata.upi_id;
          } else {
            this.upi_id = null;
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
          Swal.fire({
            title: "Oops...",
            text: this.response.data.message,
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      });
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
          console.log(this.businessdetails);
          this.bankdetails = this.response.data.bankdetails;
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

  scannapp() {
    this.router.navigate(["/scannapp"]);
  }

  editprofile() {
    this.router.navigate(["/editprofile"]);
  }
  ///////////////////////////////////////////
  editname() {
    this.router.navigate(["/editname"]);
  }

  editphone() {
    this.router.navigate(["/editphone"]);
  }

  editemail() {
    this.router.navigate(["/editemail"]);
  }

  editaddress() {
    this.router.navigate(["/editaddress"]);
  }

  editpincode() {
    this.router.navigate(["/editpincode"]);
  }

  editgender() {
    this.router.navigate(["/editgender"]);
  }

  editinterested() {
    this.router.navigate(["/editinterested"]);
  }
  editshortinfo() {
    this.router.navigate(["/editshortinfo"]);
  }
  editaboutme() {
    this.router.navigate(["/editaboutme"]);
  }
}
