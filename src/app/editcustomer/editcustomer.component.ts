import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-editcustomer",
  templateUrl: "./editcustomer.component.html",
  styleUrls: ["./editcustomer.component.scss"],
})
export class EditcustomerComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}

  response: any;
  customerdata: any = [];
  user_id: any;
  company_id: any;
  customer_id: any;
  stateslistdata: any;

  customer_name: any;
  mobile: any;
  email: any;
  address: any;
  state: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.customer_id = localStorage.getItem("customer_id");

    this.getcustomerdetail();
    this.getallStates();
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
        console.log(this.stateslistdata);
      });
  }

  getcustomerdetail() {
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
          console.log(this.customerdata);

          if (this.customerdata.customer_name != 0) {
            this.customer_name = this.customerdata.customer_name;
          } else {
            this.customer_name = null;
          }

          if (this.customerdata.mobile != 0) {
            this.mobile = this.customerdata.mobile;
          } else {
            this.mobile = null;
          }

          if (this.customerdata.email != 0) {
            this.email = this.customerdata.email;
          } else {
            this.email = null;
          }

          if (this.customerdata.address != 0) {
            this.address = this.customerdata.address;
          } else {
            this.address = null;
          }

          if (this.customerdata.state_id != 0) {
            this.state = this.customerdata.state;
          } else {
            this.state = null;
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

  editcustomerdetail(data: any) {
    console.log(data);
    this.httpclient
      .post(environment.apiBaseUrl + "editcustomerdetail", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          customer_id: this.customer_id,
          name: data.value.name,
          mobile: data.value.mobile,
          email: data.value.email,
          address: data.value.address,
          state: data.value.state,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        if (this.response.success == true) {
          Swal.fire({
            title: "Success",
            text: this.response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            this.router.navigate(["/home"]);
          });
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
