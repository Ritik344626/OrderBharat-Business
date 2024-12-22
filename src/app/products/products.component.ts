import { Component, HostListener, ViewChild, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import { environment } from "../../environments/environment";
// import { CodescannerComponent } from '../codescanner/codescanner.component';

// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
declare var $: any;

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  user_id: any = localStorage.getItem("user_id");
  company_id: any = localStorage.getItem("company_id");
  products: any = [];
  response: any;
  auth: Boolean = true;
  productloadlimit: any = 5;
  barcodetext: any = null;
  showMenu = false;
  //product_id = localStorage.getItem("product_id");
  status: any = 0;
  product_id: any;
  productCount = 0;
  scroll: Boolean = true;

  //loader indicator
  loaded = false;

  categorydata: any = [];
  category_id: any = -1;
  public alertButtons = ["OK"];
  public alertInputs = [
    {
      label: "Red",
      type: "radio",
      value: "red",
    },
    {
      label: "Blue",
      type: "radio",
      value: "blue",
    },
    {
      label: "Green",
      type: "radio",
      value: "green",
    },
  ];
  @ViewChild("popover") popover;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    if ($(window).height() <= 700) {
      this.productloadlimit = 5;
    }
    this.user_id = localStorage.getItem("user_id");
    this.company_id = localStorage.getItem("company_id");
    // this.product_id = localStorage.getItem("product_id");

    this.getallCategorytlist();

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
          console.log(this.response);
          this.products = this.response.data.products;
          this.productCount = this.response.data.total_count;
        } else if (this.response.success == false) {
          this.products = [];

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
    this.router.navigate(["/productimageadd"]);
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
  async getScrollPos(data: any) {
    var curr_pageYOffset = Math.floor(data.path[1].pageYOffset);

    if (curr_pageYOffset == $(document).height() - $(window).height()) {
      // ajax call get data from server and append to the div
      this.productloadlimit += 10;
      this.getProduct();
    }
  }
  async getProduct() {
    this.loaded = false;

    this.httpclient
      .post(environment.apiBaseUrl + "getallproducts", [
        {
          api_key: await environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          productloadlimit: this.productloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          console.log(this.response);

          this.products = this.response.data.products;
          this.productCount = this.response.data.total_count;
        } else if (this.response.success == false) {
          this.products = [];
          Swal.fire({
            title: "Oops...",
            text: this.response.data.message,
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      });
  }
  scanbarcode() {
    // var code = null;
    // code = this.barcodeScanner.scan();
    // BarcodeScanner.scan().then((barcodeData: any) => {
    //   var code = barcodeData.text;
    //   alert('Barcode text: '+code);
    //   return;
    //   this.httpclient
    //     .post(environment.apiBaseUrl + 'addtocartbybarcode', [
    //       {
    //         api_key: environment.apikey,
    //         site_id: this.user_id,
    //         barcode_text: code,
    //       },
    //     ])
    //     .subscribe((res: any) => {
    //       this.response = res;
    //       console.log(this.response);
    //       if (this.response.success == true) {
    //         Swal.fire({
    //           title: 'Success',
    //           text: this.response.data.message,
    //           icon: 'success',
    //           confirmButtonText: 'Ok',
    //         });
    //       } else if (this.response.success == false) {
    //         Swal.fire({
    //           title: 'Oops...',
    //           text: this.response.data.message,
    //           icon: 'warning',
    //           confirmButtonText: 'Ok',
    //         });
    //       }
    //     });
    // });
  }

  onLongPress(data: any) {
    //console.log('Long press triggered');
    // Add your long press logic here
    if (this.product_id != data.product_id) {
      this.showMenu = true;
      this.product_id = data.product_id;
      this.status = parseInt(data.status);
      localStorage.setItem("product_id", this.product_id);
    } else {
      this.showMenu = false;
      this.product_id = null;
      this.status = parseInt(data.status);
      localStorage.setItem("product_id", this.product_id);
    }

    console.log("selected product:::::::", data);
  }

  onLongPressEnd() {
    console.log("Long press ended");
    // Add your long press end logic here
  }

  activedeactiveproduct(status: any) {
    this.httpclient
      .post(environment.apiBaseUrl + "activedeactiveproduct", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          product_id: this.product_id,
          status: status,
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
          });

          if (status == 0) {
            this.status = 0;
          } else {
            this.status = 1;
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

  editproduct() {
    localStorage.setItem("product_id", this.product_id);
    this.router.navigate(["/editproduct"]);
  }


  highlightproduct() {
    localStorage.setItem("product_id", this.product_id);
    this.httpclient
      .post(environment.apiBaseUrl + "highlightproduct", [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          product_id: this.product_id
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

  async categorySelection($event) {
    console.log($event.target.value);
    this.loaded = false;
    this.category_id = $event.target.value;
    this.httpclient
      .post(environment.apiBaseUrl + "getallproducts", [
        {
          api_key: await environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
          category_id: $event.target.value,
          productloadlimit: this.productloadlimit,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;
        this.loaded = true;

        if (this.response.success == true) {
          this.products = this.response.data.products;
          this.productCount = this.products.length;
        } else if (this.response.success == false) {
          this.products = [];
          Swal.fire({
            title: "Oops...",
            text: this.response.data.message,
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      });
  }

  clearAll() {
    this.productloadlimit += 10;
    this.getProduct();
  }

  loadMoreProduct() {
    this.productloadlimit += 10;
    this.getProduct();
  }
}
