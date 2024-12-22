import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";

//import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { environment } from "../../environments/environment";
//import * as $ from 'jquery';

@Component({
  selector: "app-productadd",
  templateUrl: "./productadd.component.html",
  styleUrls: ["./productadd.component.scss"],
})
export class ProductaddComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router //private barcodeScanner: BarcodeScanner
  ) {}

  response: any;
  barcodetext: any = null;
  user_id: any;
  company_id: any;
  producttype: any = "";
  online_price: any;
  categorydata: any = [];
  category_name: any;
  details: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");

    this.getallCategorytlist();
  }

  addproduct(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + "addnewproduct", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          prdctnm: data.value.prdctnm,
          // prdctprice: data.value.prdctprice,
          // prdctbarcode: data.value.prdctbarcode,
          prdctopnstck: data.value.prdctopnstck,
          prdctmrp: data.value.prdctmrp,
          onlineprice: data.value.onlineprice,
          prdcthsn: data.value.prdcthsn,
          prdctgst: data.value.prdctgst,
          producttype: data.value.producttype,
          category_name: data.value.category_name,
          details: data.value.details
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
            this.router.navigate(["/products"]);
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

  // scanbarcode() {
  //   this.barcodeScanner.scan().then((barcodeData: any) => {
  //     this.barcodetext = barcodeData.text;

  //     alert('Barcode text: '+this.barcodetext);

  //     return;
  //   });
  // }

  addcategory() {
    // localStorage.setItem('customer_id', id);
    this.router.navigate(["/addcategory"]);
  }

  getallCategorytlist() {
    console.log(this.user_id);
    console.log(this.company_id);

    this.httpclient
      .post(environment.apiBaseUrl + "getallcategory", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          console.log(this.response.data.categorydata);
          this.categorydata = this.response.data.category;
          //  this.yougive = this.response.data.yougive;

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
}
