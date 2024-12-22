import { Component, HostListener, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { CodescannerComponent } from "../codescanner/codescanner.component";

//import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { environment } from "../../environments/environment";
declare var $: any;

@Component({
  selector: "app-productbulkedit",
  templateUrl: "./productbulkedit.component.html",
  styleUrls: ["./productbulkedit.component.scss"],
})
export class ProductbulkeditComponent implements OnInit {
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router // //private barcodeScanner: BarcodeScanner
  ) {}

  user_id: any = localStorage.getItem("user_id");
  company_id: any = localStorage.getItem("company_id");
  products: any = [];
  response: any;
  auth: any = true;
  productloadlimit: any;
  barcodetext: any = null;
  product_id: any = [];
  mrp_rate: any = [];
  price: any = [];
  online_price: any = [];

  //loader indicator
  loaded = false;

  ngOnInit(): void {
    this.getproduct();
  }
  getproduct() {
    this.productloadlimit = 10000;

    localStorage.setItem("prdct_page_id", "1");

    this.httpclient
      .post(environment.apiBaseUrl + "getallproducts", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          productloadlimit: this.productloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.products = this.response.data.products;
          for (var k = 0; k < this.products.length; k++) {
            this.product_id[k] = this.products[k].product_id;
            this.mrp_rate[k] = this.products[k].mrp_rate;
            this.price[k] = this.products[k].price;
            this.online_price[k] = this.products[k].online_price;
          }
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
  // editproduct(id: any) {
  //   localStorage.setItem('product_id', id);
  //   this.router.navigate(['/editproduct']);
  // }

  productview(product_id: any) {
    localStorage.setItem("product_id", product_id);
    this.router.navigate(["/productview"]);
  }

  productimageadd(product_id: any) {
    localStorage.setItem("product_id", product_id);
    this.router.navigate(["/productview"]);
  }

  searchproduct(data: any) {
    this.httpclient
      .post(environment.apiBaseUrl + "searchproductbyname", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          productname: data.target.value,
          productloadlimit: this.productloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.products = this.response.data.products;
          for (var k = 0; k < this.products.length; k++) {
            this.product_id[k] = this.products[k].product_id;
            this.mrp_rate[k] = this.products[k].mrp_rate;
            this.price[k] = this.products[k].price;
            this.online_price[k] = this.products[k].online_price;
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

  updateproduct() {
    for (var k = 0; k < this.products.length; k++) {
      //  this.product_id[k] = this.products[k].product_id;
      //  this.mrp_rate[k] = this.products[k].mrp_rate;
      //  this.price[k] = this.products[k].price;
      //  this.online_price[k] = this.products[k].online_price;

      this.httpclient
        .post(environment.apiBaseUrl + "updateproductbulk", [
          {
            api_key: environment.apikey,
            user_id: this.user_id,
            company_id: this.company_id,
            product_id: this.product_id[k],
            mrp_rate: this.mrp_rate[k],
            price: this.price[k],
            online_price: this.online_price[k],
          },
        ])
        .subscribe((res: any) => {
          this.response = res;

          if (this.response.success == true) {
            this.getproduct();
            //this.products = this.response.data.products;
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

    if (this.response.success == true) {
      Swal.fire({
        title: "Success",
        text: this.response.data.message,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else if (this.response.success == false) {
      Swal.fire({
        title: "Oops...",
        text: this.response.data.message,
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  }
}
