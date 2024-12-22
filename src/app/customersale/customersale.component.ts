import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { TokenService } from '../Services/token.service';
// import { CodescannerComponent } from '../codescanner/codescanner.component';

//import { BarcodeScanner, BarcodeScannerOptions  } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {environment} from '../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-customersale',
  templateUrl: './customersale.component.html',
  styleUrls: ['./customersale.component.scss'],
})
export class CustomersaleComponent implements OnInit {
  checkouittype: any;
  

  user_id: any = localStorage.getItem('user_id');
  company_id: any = localStorage.getItem('company_id');
  cart_page_id: any = localStorage.getItem('cart_page_id');
  cus_dropdown_state: boolean = true;
  customer_id: any = 0;
  paidamount: any = 0;
  cartdata: any;
  tmp_cartdata: any = {};
  customerdata: any;
  totalamount: any = 0;
  quantity: any = 0;
  response: any;
  auth: any = true;

  customer_name: any;
  peoductprice:any;
  gstprice:any;
  //options: BarcodeScannerOptions | any;

  constructor(
    // private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router,
    // private barcodeScanner: CodescannerComponent
    //private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit(): void {
    this.getallcartitems();

    if (this.cart_page_id == '1') {
      this.cus_dropdown_state = true;
    } else if (this.cart_page_id == '2') {
      this.customer_id = localStorage.getItem('customer_id');
      this.cus_dropdown_state = false;
    }

    this.customer_name = localStorage.getItem('customer_name');


  }

  getallcartitems() {
    this.httpclient
      .post(environment.apiBaseUrl + 'getallcartitems', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          company_id: this.company_id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.cartdata = this.response.data.cartdata;
          this.customerdata = this.response.data.customerdata;
          this.peoductprice = null;
          this.gstprice = null;
           console.log(this.cartdata);

          this.totalamount = null;
          for (var i = 0; i < this.cartdata.length; i++) {
            this.tmp_cartdata[i] = {
              product_id: this.cartdata[i].productid,
              price: this.cartdata[i].price,
              quantity: this.cartdata[i].qty,
              total: this.cartdata[i].price * this.cartdata[i].qty,
              discount: 0,
              discount_value: 0,
              discount_id: 0,
              igst: this.cartdata[i].gst,
              igst_tax: 0,
              cgst: this.cartdata[i].gst / 2,
              cgst_tax: 0,
              sgst: this.cartdata[i].gst / 2,
              sgst_tax: 0,
              booking_date: this.cartdata[i].booking_date,
            };
          }
           console.log(this.tmp_cartdata);
          for (var i = 0; i < this.cartdata.length; i++) {
           this.paidamount= this.totalamount =
              this.totalamount + ((this.cartdata[i].price * this.cartdata[i].qty)+(((this.cartdata[i].price * this.cartdata[i].qty)*this.cartdata[i].gst)/100));
              this.peoductprice =this.peoductprice + ((this.cartdata[i].price * this.cartdata[i].qty));     
              this.gstprice =this.gstprice + (((this.cartdata[i].price * this.cartdata[i].qty)*this.cartdata[i].gst)/100);
            }
        } else if (this.response.success == false) {
          Swal.fire({
            title: 'Oops...',
            text: this.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }
      });
  }

  storecusid(id: any) {
    this.customer_id = id.target.value;
    console.log(this.customer_id);
  }

  deleteitem(id: any) {
    this.httpclient
      .post(environment.apiBaseUrl + 'deletecartitembyid', [
        {
          api_key: environment.apikey,
          user_id: this.user_id,
          product_id: id,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          Swal.fire({
            title: 'Success',
            text: this.response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.getallcartitems();
          });
        } else if (this.response.success == false) {
          Swal.fire({
            title: 'Oops...',
            text: this.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }
      });
  }
  setcheckouttype(id:any) {
    this.checkouittype = id.target.value;
    console.log(this.checkouittype);
}
  customersale() {
    if (this.checkouittype == 2) {
      console.log(this.paidamount);
      this.httpclient
        .post(environment.apiBaseUrl + 'customerorder', [
          {
            api_key: environment.apikey,
            user_id: this.user_id,
            company_id: this.company_id,
            customer_id: this.customer_id,
            cartdata: this.tmp_cartdata,
            totalamount: this.totalamount,
            paidamount: this.paidamount,
            gstprice: this.gstprice,
            issame:1
          },
        ])
        .subscribe((res: any) => {
          this.response = res;

          // console.log(this.response);

          if (this.response.success == true) {
            Swal.fire({
              title: 'Success',
              text: this.response.data.message,
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then(() => {
              this.getallcartitems();
              this.router.navigate(['/home']);
            });
          } else if (this.response.success == false) {
            Swal.fire({
              title: 'Oops...',
              text: this.response.data.message,
              icon: 'warning',
              confirmButtonText: 'Ok',
            });
          }
        });
    }
    else {
         console.log(this.paidamount);
      this.httpclient
        .post(environment.apiBaseUrl + 'customersale', [
          {
            api_key: environment.apikey,
            user_id: this.user_id,
            company_id: this.company_id,
            customer_id: this.customer_id,
            cartdata: this.tmp_cartdata,
            totalamount: this.totalamount,
            paidamount: this.paidamount,
            gstprice: this.gstprice
          },
        ])
        .subscribe((res: any) => {
          this.response = res;

          // console.log(this.response);

          if (this.response.success == true) {
            Swal.fire({
              title: 'Success',
              text: this.response.data.message,
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then(() => {
              this.getallcartitems();
              this.router.navigate(['/home']);
            });
          } else if (this.response.success == false) {
            Swal.fire({
              title: 'Oops...',
              text: this.response.data.message,
              icon: 'warning',
              confirmButtonText: 'Ok',
            });
          }
        });
    }
  }

  addtocart(id: any, price: any, polarity: any, type: any) {
    this.quantity = $('#quantity' + id).val();

    if (type == 1) {
      if (polarity == 1) {
        if (this.quantity <= 0) {
          this.quantity = 1;
        } else {
          this.quantity -= 1;
          if (this.quantity <= 0) {
            this.quantity = 1;
          }
        }
      } else if (polarity == 2) {
        this.quantity = Number(this.quantity) + 1;
      }
    } else if (type == 2) {
      this.quantity = this.quantity.replace(/[a-zA-Z]/g, '');
      this.quantity = this.quantity.replace(
        /[-_!@^&\/\\#,;+()$~%.'":*?<>{}]/g,
        ''
      );

      if (this.quantity == 0) {
        this.quantity = 1;
      }
    }

    $('#quantity' + id).val(this.quantity);

    this.httpclient
      .post(environment.apiBaseUrl + 'addtocart', [
        {
          api_key: environment.apikey,
          site_id: this.user_id,
          product_id: id,
          price: price,
          qty: this.quantity,
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
          this.getallcartitems();
          // this.products = this.response.data.products;
        } else if (this.response.success == false) {
          Swal.fire({
            title: 'Oops...',
            text: this.response.data.message,
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }
      });
  }

  // scanbarcode() {
  //   // var code = null;
  //   // code = this.barcodeScanner.scan();
  //   console.log(this.barcodeScanner);
  //   this.options = {
  //     prompt: "Scan your qrcode "
  //   };

  //   this.barcodeScanner.scan(this.options).then((barcodeData: any) => {
  //     var code = barcodeData.text;
  //     this.httpclient
  //       .post(environment.apiBaseUrl + 'addtocartbybarcode', [
  //         {
  //           api_key: environment.apikey,
  //           site_id: this.user_id,
  //           barcode_text: code,
  //         },
  //       ])
  //       .subscribe((res: any) => {
  //         this.response = res;

  //         console.log(this.response);

  //         if (this.response.success == true) {
  //           Swal.fire({
  //             title: 'Success',
  //             text: this.response.data.message,
  //             icon: 'success',
  //             confirmButtonText: 'Ok',
  //           });
  //         } else if (this.response.success == false) {
  //           Swal.fire({
  //             title: 'Oops...',
  //             text: this.response.data.message,
  //             icon: 'warning',
  //             confirmButtonText: 'Ok',
  //           });
  //         }
  //       });
  //   });

  //   // if (code != null) {
  //   //   this.httpclient
  //   //     .post(environment.apiBaseUrl + 'addtocartbybarcode', [
  //   //       {
  //   //         api_key: environment.apikey,
  //   //         site_id: this.user_id,
  //   //         barcode_text: code,
  //   //       },
  //   //     ])
  //   //     .subscribe((res: any) => {
  //   //       this.response = res;

  //   //       console.log(this.response);

  //   //       if (this.response.success == true) {
  //   //         Swal.fire({
  //   //           title: 'Success',
  //   //           text: this.response.data.message,
  //   //           icon: 'success',
  //   //           confirmButtonText: 'Ok',
  //   //         });
  //   //       } else if (this.response.success == false) {
  //   //         Swal.fire({
  //   //           title: 'Oops...',
  //   //           text: this.response.data.message,
  //   //           icon: 'warning',
  //   //           confirmButtonText: 'Ok',
  //   //         });
  //   //       }
  //   //     });
  //   // }

  //   // })
  //   // .catch((err) => {
  //   //   console.log('Error', err);
  //   // });

  //   // cordova.plugins.barcodeScanner.scan(
  //   //   (result: any) => {
  //   //     alert(
  //   //       'We got a barcode\n' +
  //   //         'Result: ' +
  //   //         result.text +
  //   //         '\n' +
  //   //         'Format: ' +
  //   //         result.format +
  //   //         '\n' +
  //   //         'Cancelled: ' +
  //   //         result.cancelled
  //   //     );
  //   //   },
  //   //   (error: any) => {
  //   //     alert('Scanning failed: ' + error);
  //   //   }
  //   // );
  // }
}
