import { Component, HostListener, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";

declare var $: any;

@Component({
  selector: "app-businessdetails",
  templateUrl: "./businessdetails.component.html",
  styleUrls: ["./businessdetails.component.scss"],
})
export class BusinessdetailsComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  otherdata: any = [];
  allbusinessdetailsbycategory: any = [];
  category_id: any;
  user_id: any;
  company_id: any;
  state: any = "";
  city_id: any = "";
  state_id: any = 0;
  stateslistdata: any;
  businessdetailsloadlimit: any;
  hei: any = $(window).height();

  //loader indicator
  loaded = false;
  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.category_id = localStorage.getItem("business_info_category_id");
    this.getallbusinessdetailsbycategory();
    this.getallStates();
  }

  getallbusinessdetailsbycategory() {
    if ($(window).height() <= this.hei) {
      this.businessdetailsloadlimit = 50;
    }
    console;
    this.httpclient
      .post(environment.apiBaseUrl + "getallbusinessdetailsbycategory", [
        {
          api_key: environment.apikey,
          category_id: this.category_id,
          businessdetailsloadlimit: this.businessdetailsloadlimit,
          user_id: this.user_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.allbusinessdetailsbycategory =
            this.response.data.allbusinessdetailsbycategory;
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

  @HostListener("window:scroll", ["$event"])
  getScrollPos(data: any) {
    var curr_pageYOffset = Math.floor(data.path[1].pageYOffset);

    if (curr_pageYOffset == $(document).height() - $(window).height()) {
      // ajax call get data from server and append to the div
      this.businessdetailsloadlimit += 50;

      this.httpclient
        .post(environment.apiBaseUrl + "getallbusinessdetailsbycategory", [
          {
            api_key: environment.apikey,
            category_id: this.category_id,
            // lastcusid: this.lastcusid,
            businessdetailsloadlimit: this.businessdetailsloadlimit,
          },
        ])
        .subscribe((res: any) => {
          this.response = res;

          if (this.response.success == true) {
            this.allbusinessdetailsbycategory =
              this.response.data.allbusinessdetailsbycategory;

            // for (var i = 0; i < this.customerdata.length; i++) {
            //   this.lastcusid = this.customerdata[i].customer_id;
            // }
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

  businessquery(id: any) {
    localStorage.setItem("business_details_id", id);
    this.router.navigate(["/businessquery"]);
  }

  getallStates() {
    this.httpclient
      .post(environment.apiBaseUrl + "getallStates", [
        {
          api_key: environment.apikey,
        },
      ])
      .subscribe((res: any) => {
        this.stateslistdata = res.data;
      });
  }

  stateid(id: any) {
    if ($(window).height() <= this.hei) {
      this.businessdetailsloadlimit = 50;
    }
    this.state_id = id.target.value;
    localStorage.setItem("state_id", this.state_id);
    this.city_id = "";

    var category_id = localStorage.getItem("business_info_category_id");
    this.httpclient
      .post(environment.apiBaseUrl + "searchbusinesslist", [
        {
          api_key: environment.apikey,
          state_id: id.target.value,
          category_id: category_id,
          businessdetailsloadlimit: this.businessdetailsloadlimit,
          user_id: this.user_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.allbusinessdetailsbycategory =
            this.response.data.allbusinessdetailsbycategory;
          //  this.customerdata = this.response.data.customerdata;
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
