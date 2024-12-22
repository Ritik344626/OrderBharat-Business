import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-orderlist",
  templateUrl: "./orderlist.component.html",
  styleUrls: ["./orderlist.component.scss"],
})
export class OrderlistComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  customer_id: any = [];
  customerdata: any = [];
  customerdata1: any = [];

  salesdata: any = [];
  user_id: any;
  company_id: any;

  //loader indicator
  loaded = false;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.customer_id = localStorage.getItem("customer_id");
    // this.getcustomerdetails();
    this.getallsales();
  }

  getcustomerdetails() {
    this.httpclient
      .post(environment.apiBaseUrl + "getcustomerdetail", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customer_id: this.customer_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.customerdata = this.response.data.customerdata;
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

  getallsales() {
    // if ($(window).height() <= 600) {
    //   this.customerloadlimit = 5;
    //  }

    this.httpclient
      .post(environment.apiBaseUrl + "getallorderinvoice", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          // customer_id: this.customer_id,
          //    customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;
        if (this.response.success == true) {
          this.salesdata = this.response.data.salesdata;
          // for (var i = 0; i < this.customerdata.length; i++) {
          //   this.lastcusid = this.customerdata[i].customer_id;
          // }
        } else if (this.response.success == false) {
          // Swal.fire({
          //   title: 'Oops...',
          //   text: this.response.data.message,
          //   icon: 'warning',
          //   confirmButtonText: 'Ok',
          // });
        }
      });
  }

  yougive(customer_id: any) {
    localStorage.setItem("customer_id", customer_id);
    this.router.navigate(["/yougive"]);
  }

  yougot(customer_id: any) {
    localStorage.setItem("customer_id", customer_id);
    this.router.navigate(["/yougot"]);
  }

  vieworders(order_id: any) {
    localStorage.setItem("order_id", order_id);
    this.router.navigate(["/orderview"]);
  }
  customersale() {
    this.router.navigate(["/customersale"]);
  }

  invoicelist() {
    this.router.navigate(["/invoicelist"]);
  }

  home() {
    this.router.navigate(["/home"]);
  }



  searchorderlist(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + "searchorderlistbyid", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          categoryname: data.target.value,
        //  customerloadlimit: this.customerloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.salesdata = this.response.data.salesdata;

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
