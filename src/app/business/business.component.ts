import { Component, HostListener, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";

declare var $: any;

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.scss"],
})
export class BusinessComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  auth: any = true;
  otherdata: any = [];
  businesscategory: any = [];
  // lastcatid: any = 1;
  user_id: any;
  company_id: any;

  categoryloadlimit: any;

  //loader indicator
  loaded = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.getallbusinesscategory();

    // this.httpclient
    //   .post(
    //     'https://rpsgroupoftechnology.com/Company/check_validation_gbosss',
    //     [
    //       {
    //         validationkey: 'gbosss',
    //       },
    //     ]
    //   )
    //   .subscribe((res: any) => {

    //     this.response = res;
    //      console.log(this.response);

    //     if (this.response == 1) {
    //       this.auth = true;
    //     } else if (this.response == 0) {
    //       this.auth = false;
    //       Swal.fire({
    //         title: 'Oops...',
    //         text: 'Service not available!',
    //         icon: 'warning',
    //         confirmButtonText: 'Ok',
    //       });
    //     }
    //   });
  }

  getallbusinesscategory() {
    if ($(window).height() <= 800) {
      this.categoryloadlimit = 15;
    }

    this.httpclient
      .post(environment.apiBaseUrl + "getallbusinesscategory", [
        {
          api_key: environment.apikey,
          // lastcatid: this.lastcatid,
          categoryloadlimit: this.categoryloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.businesscategory = this.response.data.businesscategory;

          // for (var i = 0; i < this.businesscategory.length; i++) {
          //   this.lastcatid = this.businesscategory[i].business_info_category_id;
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

  @HostListener("window:scroll", ["$event"])
  getScrollPos(data: any) {
    var curr_pageYOffset = Math.floor(data.path[1].pageYOffset);

    if (curr_pageYOffset == $(document).height() - $(window).height()) {
      // ajax call get data from server and append to the div
      this.categoryloadlimit += 10;
      this.httpclient
        .post(environment.apiBaseUrl + "getallbusinesscategory", [
          {
            api_key: environment.apikey,
            // lastcusid: this.lastcusid,
            categoryloadlimit: this.categoryloadlimit,
          },
        ])
        .subscribe((res: any) => {
          this.response = res;

          if (this.response.success == true) {
            this.businesscategory = this.response.data.businesscategory;

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

  businessdetails(id: any) {
    localStorage.setItem("business_info_category_id", id);
    this.router.navigate(["/businessdetails"]);
  }
}
