import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
//import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { environment } from "../../environments/environment";

@Component({
  selector: "app-editproduct",
  templateUrl: "./editproduct.component.html",
  styleUrls: ["./editproduct.component.scss"],
})
export class EditproductComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router //private barcodeScanner: BarcodeScanner
  ) {}

  response: any;
  productdata: any = [];
  user_id: any;
  company_id: any;
  product_id: any;

  name: any;
  price: any;
  prdctprice: any;
  online_price: any;
  quantity: any;
  mrp_rate: any;
  hsn_sac_code: any;
  igst: any;
  producttype: any = "";
  prdctbarcode: any;
  barcodetext: any;
  barcode_text: any;
  categorydata: any = [];
  category_name: any;
  categoryId = "";

  details: any;

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    this.product_id = localStorage.getItem("product_id");

    this.getproductdetail();
    this.getallCategorytlist();
  }

  getproductdetail() {
    this.httpclient
      .post(environment.apiBaseUrl + "getproductdetail", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          product_id: this.product_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.productdata = this.response.data.productdata;
          console.log(this.productdata);
          if (this.productdata.name != 0) {
            this.name = this.productdata.name;
          } else {
            this.name = null;
          }
          if (this.productdata.category_id != "") {
            this.categoryId = this.productdata.category_id;
          } else {
            this.categoryId = "";
          }

          if (this.productdata.price != 0) {
            this.price = this.productdata.price;
          } else {
            this.price = null;
          }

          if (this.productdata.quantity != 0) {
            this.quantity = this.productdata.quantity;
          } else {
            this.quantity = null;
          }

          if (this.productdata.mrp_rate != 0) {
            this.mrp_rate = this.productdata.mrp_rate;
          } else {
            this.mrp_rate = null;
          }

          if (this.productdata.online_price != 0) {
            this.online_price = this.productdata.online_price;
          } else {
            this.online_price = null;
          }

          if (this.productdata.hsn_sac_code != 0) {
            this.hsn_sac_code = this.productdata.hsn_sac_code;
          } else {
            this.hsn_sac_code = null;
          }

          if (this.productdata.barcode_text != 0) {
            this.barcode_text = this.productdata.barcode_text;
          } else {
            this.barcode_text = null;
          }

          if (this.productdata.producttype != 0) {
            this.producttype = this.productdata.producttype;
          } else {
            this.producttype = "";
          }

          if (this.productdata.description != 0) {
            this.details = this.productdata.description;
          } else {
            this.details = "";
          }

          if (this.productdata.igst != 0) {
            this.igst = this.productdata.igst;
          } else {
            this.igst = null;
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

  editproductdetail(data: any) {
    console.log(data.value.prdctprice),
      this.httpclient
        .post(environment.apiBaseUrl + "editproductdetail", [
          {
            api_key: environment.apikey,
            user_id: this.user_id,
            company_id: this.company_id,
            product_id: data.value.product_id,
            prdctnm: data.value.prdctnm,
            prdctprice: data.value.prdctprice,
            prdctopnstck: data.value.prdctopnstck,
            prdctmrp: data.value.prdctmrp,
            prdctonlile: data.value.prdctonlile,
            prdcthsn: data.value.prdcthsn,
            prdctgst: data.value.prdctgst,
            prdctbarcode: data.value.prdctbarcode,
            producttype: data.value.producttype,
            category_id: data.value.categoryId,
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

  addcategory() {
    // localStorage.setItem('customer_id', id);
    this.router.navigate(["/addcategory"]);
  }
}
