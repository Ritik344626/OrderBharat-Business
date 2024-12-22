import { Component, HostListener, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";
declare var $: any;
@Component({
  selector: "app-categorylist",
  templateUrl: "./categorylist.component.html",
  styleUrls: ["./categorylist.component.scss"],
})
export class CategorylistComponent implements OnInit {
  user_id: any = localStorage.getItem("user_id");
  company_id: any = localStorage.getItem("company_id");

  products: any = [];
  response: any;
  auth: Boolean = true;
  productloadlimit: any;
  barcodetext: any = null;
  showMenu = false;
  category_id: any;

  //loader indicator
  loaded = false;

  categorydata: any = [];
  public alertButtons = ["OK"];

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.contentLoad();
  }

  contentLoad() {
    if ($(window).height() <= 700) {
      this.productloadlimit = 10;
    }
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");

    this.getallCategorytlist();
  }

  // editproduct() {
  //   localStorage.setItem("product_id", id);
  //   this.router.navigate(["/editproduct"]);
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
        this.loaded = true;

        if (this.response.success == true) {
          this.categorydata = this.response.data.category;
          console.log(this.categorydata);
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

  categoryimageadd(category_id: any) {
    localStorage.setItem("category_id", category_id);
    this.router.navigate(["/categoryimageupload"]);
  }

  editcategory() {
    localStorage.setItem("category_id", this.category_id);
    this.router.navigate(["/categoryedit"]);
  }

  deletecategory() {
    //  localStorage.setItem("category_id", category_id);

    console.log(this.user_id);
    this.httpclient
      .post(environment.apiBaseUrl + "deletecategory", [
        {
          api_key: environment.apikey,
          category_id: this.category_id,
          //    company_id: this.company_id,
          // categoryname: data.value.categoryname,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.contentLoad();
        this.showMenu = false;
        this.category_id = null;

        if (this.response.success == true) {
          Swal.fire({
            title: "Success",
            text: this.response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            this.router.navigate(["/categorylist"]);
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

  onLongPress(data: any) {
    //console.log('Long press triggered');
    // Add your long press logic here
    this.showMenu = true;
    this.category_id = data.category_id;
    console.log("selected product:::::::", data.category_id);
  }

  onLongPressEnd() {
    console.log("Long press ended");
    // Add your long press end logic here
  }
}
