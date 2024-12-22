import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";
// import { CodescannerComponent } from '../codescanner/codescanner.component';

// //import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

declare var $: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  response: any;
  cartdata: any;
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router // private barcodeScanner: CodescannerComponent // //private barcodeScanner: BarcodeScanner
  ) {}
  user_id: any = localStorage.getItem("user_id");
  company_id: any = localStorage.getItem("company_id");

  public alertButtons = [
    {
      text: "Cancel",
      role: "cancel",
      handler: () => {
        console.log("logout canceled");
        // $("#dismiss").click();
      },
    },
    {
      text: "OK",
      role: "confirm",
      handler: () => {
        console.log("logout confirmed");
        localStorage.clear();
        this.router.navigate([""]);
      },
    },
  ];

  ngOnInit(): void {
    // $('#sidebar').mCustomScrollbar({
    //   theme: 'minimal',
    // });

    $("#dismiss, .overlay").on("click", function () {
      $("#sidebar").removeClass("active");
      $(".overlay").removeClass("active");
    });

    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").addClass("active");
      $(".overlay").addClass("active");
      $(".collapse.in").toggleClass("in");
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });

    this.httpclient
      .post(environment.apiBaseUrl + "getallcartitems", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.cartdata = this.response.data.cartdata.length;
          console.log(this.cartdata);
        }
      });
  }

  gotocart() {
    localStorage.setItem("cart_page_id", "1");
    this.router.navigateByUrl("/customersale");
  }
  orderlist() {
    this.router.navigateByUrl("/customersale");
  }

  subscription() {
    this.router.navigateByUrl("/subscription");
  }
}
